/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avatarappearance', {
    Owner: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    Serial: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    Visual_Params: {
      type: 'BLOB',
      allowNull: false
    },
    Texture: {
      type: 'BLOB',
      allowNull: false
    },
    Avatar_Height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Body_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Body_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Skin_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Skin_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Hair_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Hair_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Eyes_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Eyes_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Shirt_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Shirt_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Pants_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Pants_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Shoes_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Shoes_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Socks_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Socks_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Jacket_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Jacket_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Gloves_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Gloves_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Undershirt_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Undershirt_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Underpants_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Underpants_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Skirt_Item: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    Skirt_Asset: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    alpha_item: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '00000000-0000-0000-0000-000000000000'
    },
    alpha_asset: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '00000000-0000-0000-0000-000000000000'
    },
    tattoo_item: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '00000000-0000-0000-0000-000000000000'
    },
    tattoo_asset: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '00000000-0000-0000-0000-000000000000'
    },
    physics_item: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '00000000-0000-0000-0000-000000000000'
    },
    physics_asset: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: '00000000-0000-0000-0000-000000000000'
    }
  }, {
    tableName: 'avatarappearance'
  });
};
