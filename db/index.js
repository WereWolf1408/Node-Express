const Sequelize = require('sequelize');
const bd = require('../config/db.config');

const sequelize = new Sequelize(bd.database , bd.login, bd.password, bd.options);


// async function test() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// test();


module.exports = sequelize;