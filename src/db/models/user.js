'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      is: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/i
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  return User;
};