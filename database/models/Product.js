//TABLA PRODUCTOS//
module.exports = (sequelize, dataTypes) => {
    const alias = "Products";
  
    const cols = {
      Id: {
        type: dataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
  
      },
      Nombre: {
        type: dataTypes.STRING
  
      },
      Precio: {
        type: dataTypes.INTEGER
  
      },
      Descripcion: {
        type: dataTypes.STRING
  
      },
      
      IdProductosCategoria: {
        type: dataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true
  
      },
      //ProductosCyT: {
        //type: dataTypes.STRING,
        //foreignKey: true
  
      //}
    };
  
    const config = {
      tableName :"Productos",
      timestamps : false
    };
  
  
    const User = sequelize.define(alias,cols,config);
    return Products  
  }