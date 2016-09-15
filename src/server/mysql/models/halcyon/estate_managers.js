/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estate_managers', {
    EstateId: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'estate_managers'
  });
};
