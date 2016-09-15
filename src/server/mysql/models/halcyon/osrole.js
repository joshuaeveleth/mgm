/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osrole', {
    GroupID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    RoleID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Powers: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'osrole'
  });
};
