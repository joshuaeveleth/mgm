/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estate_settings', {
    EstateID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EstateName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    AbuseEmailToEstateOwner: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    DenyAnonymous: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    ResetHomeOnTeleport: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    FixedSun: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    DenyTransacted: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    BlockDwell: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    DenyIdentified: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    AllowVoice: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    UseGlobalTime: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    PricePerMeter: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    TaxFree: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    AllowDirectTeleport: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    RedirectGridX: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    RedirectGridY: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ParentEstateID: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    SunPosition: {
      type: 'DOUBLE',
      allowNull: false
    },
    EstateSkipScripts: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    BillableFactor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    PublicAccess: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    AbuseEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EstateOwner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DenyMinors: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    AllowLandmark: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    AllowParcelChanges: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    AllowSetHome: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'estate_settings'
  });
};
