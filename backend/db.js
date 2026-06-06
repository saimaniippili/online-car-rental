const { Sequelize } = require('sequelize');

// Update these credentials if your local MySQL uses a different username/password
const sequelize = new Sequelize('car-rental', 'root', 'Sai@2004', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Set to console.log to see SQL queries
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('MySQL DB Connection Successful');
        
        // This will automatically create tables based on models if they don't exist
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');
    } catch (error) {
        console.error('MySQL DB Connection Error:', error);
    }
}

connectDB();

module.exports = sequelize;