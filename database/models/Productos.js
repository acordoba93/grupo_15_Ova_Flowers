//TABLA PRODUCTOS//
module.exports = (sequelize, dataTypes) => {
  const alias = "Producto";

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
    
    //IdProductosCategoria: {
    //  type: dataTypes.INTEGER,
    //  foreignKey: true,
    //  autoIncrement: true

    //},
    //ProductosCyT: {
      //type: dataTypes.STRING,
      //foreignKey: true

    //}
  };

  const config = {
    tableName :"Products",
    timestamps : false
  };


  const Producto= sequelize.define(alias,cols,config);

  Producto.associate = function (models) {
    Producto.belongsToMany(models.Cayegoria, {
      as: "ProductoCategoria",
      through: "ProductoCategoria",
      foreignKey: "Productos-Id",
      otherKey: "Categorias-Id",
      timestamps: false
    });
   }
  return Producto  
}