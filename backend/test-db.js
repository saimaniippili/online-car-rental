const sequelize = require('./db');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Authentication successful.');
        await sequelize.sync({ alter: true });
        console.log('Sync successful.');
    } catch (err) {
        console.error('Failed to connect:', err);
    } finally {
        process.exit();
    }
}

testConnection();
