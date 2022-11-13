//TABLA PRODUCTOS-CATEGORIAS--T.PIVOT//
module.exports = (sequelize, dataTypes) => {
    const alias = "ProdutsCategory";
  
    const cols = {
      Id: {
        type: dataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
  
      },
      IdProductos: {
        type: dataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true
  
      },
      
      IdCategorias: {
        type: dataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true
  
      },
     
    };
  
    const config = {
      tableName :"ProductosCategorias",
      timestamps : false
    };
  
  
    const User = sequelize.define(alias,cols,config);
    return ProdutsCategory  
  }