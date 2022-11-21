//TABLA COLORES //
module.exports = (sequelize, dataTypes) => {
  const alias = "Colores";

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
    tableName :"Colors",
    timestamps : false
  };


  const Colores = sequelize.define(alias,cols,config);

  Colores.associate = function (models) {
    Colores.belongsToMany(models.Producto, {
      as: "ProductoFinal",
      through: "ProductoFinal",
      foreignKey: "Colores-Id",
      otherKey: "ProductoCategoria-Id",
      otherKey: "Talles-Id",
      timestamps: false
    });
   }
  return Colores 
}