/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventoryfolders', {
    folderName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '0'
    },
    version: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    folderID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '00000000-0000-0000-0000-000000000000',
      primaryKey: true
    },
    agentID: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    parentFolderID: {
      type: DataTypes.CHAR(36),
      allowNull: true
    }
  }, {
    tableName: 'inventoryfolders'
  });
};
