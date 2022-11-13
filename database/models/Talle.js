//TABLA TALLES //
module.exports = (sequelize, dataTypes) => {
    const alias = "Size";
  
    const cols = {
      Id: {
        type: dataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
  
      },
      Talle: {
        type: dataTypes.STRING
          
      },      
      IdProductosCategoria: {
        type: dataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true
  
      },     
    };
  
    const config = {
      tableName :"Talles",
      timestamps : false
    };
  
  
    const User = sequelize.define(alias,cols,config);
    return Size 
  }