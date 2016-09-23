import * as Sequelize from 'sequelize';

export function regions(sequelize, DataTypes) {
  return sequelize.define('regions', {
    uuid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER(6),
      allowNull: true,
      defaultValue: '1'
    },
    httpPort: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    consolePort: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    consoleUname: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '0000'
    },
    consolePass: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '0000'
    },
    locX: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    locY: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    externalAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    slaveAddress: {
      type: DataTypes.CHAR(15),
      allowNull: true
    },
    isRunning: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
      tableName: 'regions',
      timestamps: false
    });
};
