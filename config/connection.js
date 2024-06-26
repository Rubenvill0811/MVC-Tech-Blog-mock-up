const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        port: '3001',
        dialect: 'mysql2',
        dialectModule: require('mysql2'),
    }
);

module.exports = sequelize;