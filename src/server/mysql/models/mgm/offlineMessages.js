/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('offlineMessages', {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'offlineMessages'
  });
};
