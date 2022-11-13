//TABLA COLORES //
module.exports = (sequelize, dataTypes) => {
    const alias = "Colors";
  
    const cols = {
      Id: {
        type: dataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
  
      },
      coloresPrimarios: {
        type: dataTypes.STRING
          
      },
      coloresSecundarios: {
        type: dataTypes.STRING
          
      },
      IdProductosCategoria: {
        type: dataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true
  
      },     
    };
  
    const config = {
      tableName :"Colores",
      timestamps : false
    };
  
  
    const User = sequelize.define(alias,cols,config);
    return Colors 
  }