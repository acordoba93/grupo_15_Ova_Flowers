//TABLA USUARIOS//
module.exports = (sequelize, dataTypes) => {
  const alias = "Users";

  const cols = {
    Id: {
      type: dataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true

    },
    NonbreCompleto: {
      type: dataTypes.STRING

    },
    DNI: {
      type: dataTypes.INTEGER

    },
    Email: {
      type: dataTypes.STRING

    },
    Password: {
      type: dataTypes.INTEGER

    },
    Celular: {
      type: dataTypes.INTEGER

    },
    IdProductosCyT: {
      type: dataTypes.INTEGER,
      autoIncrement: true
      //foreignKey: true

    }
  };

  const config = {
    tableName :"Usuarios",
    timestamps : false
  };


  const Users = sequelize.define(alias,cols,config);

  Users.associate = function(models) {
    Users.hasMany(models.ProductoFinal, {
      as: "usuario-producto",
      foreignKey: "ProductoFinal-Id"
    })
  }
  return Users  
}