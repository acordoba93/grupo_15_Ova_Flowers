//TABLA CATEGORIAS//
module.exports = (sequelize, dataTypes) => {
  const alias = "Categorias";

  const cols = {
    Id: {
      type: dataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true

    },
    Diciplina: {
      type: dataTypes.STRING

    },
    
         
  };

  const config = {
    tableName :"Category",
    timestamps : false
  };

  
   const Categorias = sequelize.define(alias,cols,config);
   
   Categorias.associate = function (models) {
    Categorias.belongsToMany(models.Productos, {
      as: "ProductoCategoria",
      through: "ProductoCategoria",
      foreignKey: "Categorias-Id",
      otherKey: "Productos-Id",
      timestamps: false
    });
   }

  return Categorias 
}