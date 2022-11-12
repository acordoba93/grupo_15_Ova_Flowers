const { body } = require("express-validator");

const validaciones = [
    body("nombre").isEmpty().withMessage("debe tener un nombre").bail()
    .isString().withMessage("debe ser solo letras").bail()
    .isLength({min:3}).withMessage("debe tener por lo menos 3 letras").bail()
    .isLength({max:15}).withMessage("debe tener como maximo 15 letras"),
    
    body("descripcion").isEmpty().withMessage("debe tener una descripcion").bail()
    .isString().withMessage("debe ser solo letras"),

    body("talle").isEmpty().withMessage("debe seleccionar un talle").bail()
    .isLength({max:3}).withMessage("maximo 3 letras"),

    body("precio").isEmpty().withMessage("el nuevo producto debe tener un precio").bail()
    .isNumeric().withMessage("el precio debe ser un valor numerico"),

    body("categoria").isEmpty().withMessage("el nuevo producto debe estar en una de las 2 categorías").bail()
   
];


module.exports = validaciones;