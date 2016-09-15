/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osgroup', {
    GroupID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    Charter: {
      type: DataTypes.STRING,
      allowNull: false
    },
    InsigniaID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FounderID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MembershipFee: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    OpenEnrollment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ShowInList: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    AllowPublish: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    MaturePublish: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    OwnerRoleID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'osgroup'
  });
};
