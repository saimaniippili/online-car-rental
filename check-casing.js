const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir);
const jsFiles = allFiles.filter(f => f.endsWith('.js') || f.endsWith('.jsx'));

let hasErrors = false;

jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /import\s+.*?from\s+['"](.*?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    // Skip node_modules
    if (!importPath.startsWith('.')) continue;

    const dir = path.dirname(file);
    // Try .js, .jsx, .css, or folder index
    const possibleExtensions = ['', '.js', '.jsx', '.css', '/index.js'];
    
    let resolved = false;
    let actualCase = '';

    for (const ext of possibleExtensions) {
      const fullPath = path.resolve(dir, importPath + ext);
      if (fs.existsSync(fullPath)) {
        // Check actual casing using readdirSync
        const parsed = path.parse(fullPath);
        const parentDir = parsed.dir;
        if(fs.existsSync(parentDir)) {
          const actualFiles = fs.readdirSync(parentDir);
          const matchedFile = actualFiles.find(f => f.toLowerCase() === parsed.base.toLowerCase());
          if (matchedFile && matchedFile !== parsed.base) {
             console.error(`CASE MISMATCH in ${file}:`);
             console.error(`  Imported: '${importPath}' -> expects '${parsed.base}'`);
             console.error(`  Actual File: '${matchedFile}'`);
             hasErrors = true;
          }
        }
        resolved = true;
        break;
      }
    }
  }
});

if (!hasErrors) {
  console.log("No casing issues found.");
} else {
  process.exit(1);
}
