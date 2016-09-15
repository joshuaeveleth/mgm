/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estate_map', {
    RegionID: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '00000000-0000-0000-0000-000000000000',
      primaryKey: true
    },
    EstateID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'estate_map'
  });
};
