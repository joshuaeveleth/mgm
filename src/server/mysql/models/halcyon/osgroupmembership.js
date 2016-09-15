/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osgroupmembership', {
    GroupID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    AgentID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    SelectedRoleID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Contribution: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ListInProfile: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    AcceptNotices: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'osgroupmembership'
  });
};
