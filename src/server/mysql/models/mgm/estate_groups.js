/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estate_groups', {
    EstateID: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    uuid: {
      type: DataTypes.CHAR(36),
      allowNull: false
    }
  }, {
    tableName: 'estate_groups'
  });
};
