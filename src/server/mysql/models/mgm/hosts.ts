import * as Sequelize from 'sequelize';

export function hosts(sequelize, DataTypes) {
  return sequelize.define('hosts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.CHAR(15),
      allowNull: false
    },
    port: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cmd_key: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '0000'
    },
    slots: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
      tableName: 'hosts',
      timestamps: false
    });
};
