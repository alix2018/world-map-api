'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    pasword: DataTypes.STRING
  }, {});
  return User;
};