/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    registered: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};
