//TABLA TALLES //
module.exports = (sequelize, dataTypes) => {
    const alias = "Talles";
  
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
      tableName :"Sizes",
      timestamps : false
    };
  
  
    const Talles = sequelize.define(alias,cols,config);

    Talles.associate = function (models) {
      Talles.belongsToMany(models.Producto, {
        as: "ProductoFinal",
        through: "ProductoFinal",
        foreignKey: "Talle-Id",
        otherKey: "ProductoCategoria-Id",
        otherKey: "Colores-Id",
        timestamps: false
      });
     }

    return Talles 
  }