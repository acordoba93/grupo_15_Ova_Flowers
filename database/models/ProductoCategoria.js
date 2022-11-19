//TABLA PRODUCTOS-CATEGORIAS--T.PIVOT//
module.exports = (sequelize, dataTypes) => {
    const alias = "ProdutoCategorias";
  
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
      tableName :"ProductsCategories",
      timestamps : false
    };
  
  
    const ProdutoCategorias = sequelize.define(alias,cols,config);

  

   

    return ProdutoCategorias  
  }