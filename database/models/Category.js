//TABLA CATEGORIAS//
module.exports = (sequelize, dataTypes) => {
    const alias = "Category";
  
    const cols = {
      Id: {
        type: dataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
  
      },
      Diciplinas: {
        type: dataTypes.STRING
  
      },
      
      IdProductosCategoria: {
        type: dataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true
  
      },
     
    };
  
    const config = {
      tableName :"Categorias",
      timestamps : false
    };
  
  
    const User = sequelize.define(alias,cols,config);
    return Category  
  }