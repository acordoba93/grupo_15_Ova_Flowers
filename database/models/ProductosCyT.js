//TABLA PRODUCTOS-COLORES Y TALLES--T.PIVOT//
module.exports = (sequelize, dataTypes) => {
    const alias = "ProdutsCyT";
  
    const cols = {
      Id: {
        type: dataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
  
      },
      IdProductosCategoria: {
        type: dataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true
  
      },
        IdColores: {
        type: dataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true
  
      },
      IdTalles: {
        type: dataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true
  
      },     
    };
  
    const config = {
      tableName :"ProductosCyT",
      timestamps : false
    };
  
  
    const User = sequelize.define(alias,cols,config);
    return ProdutsCyT 
  }