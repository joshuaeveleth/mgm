/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estateban', {
    EstateID: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    bannedUUID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bannedIp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bannedIpHostMask: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bannedNameMask: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'estateban'
  });
};
