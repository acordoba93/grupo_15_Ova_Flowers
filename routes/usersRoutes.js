const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usersController = require("../controllers/usersController");
const validarUsuarioNuevo = require("../middleware/validarUsuarioNuevo");
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware'); 
const userLogMiddleware = require("../middleware/userLogMiddleware");
const upload = require("../middleware/multerMiddlewareUser");
const admin = require("../middleware/adminMiddleware");

// // ***********  MULTER  ***********
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, "public/images/usuarios");
//     },
//     filename: function(req, file, cb){
//         cb(null, Date.now() + "" + file.originalname)
//     },
// });

// const upload = multer({storage});

router.get("/", usersController.index);
router.get("/admin", admin, usersController.admin);

router.get("/login", usersController.login);
router.get("/register", usersController.visualizarRegistro);
router.post("/register", (upload.single('imagen')), validarUsuarioNuevo, usersController.create);
router.get("/detail/:id", usersController.detalle);

router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", (upload.single('imagen')), usersController.update);

router.delete("/delete/:id", usersController.destroy);

router.get("/recuperarPassword", usersController.recuperarPassword);

// const express = require("express");
// const router = express.Router();
// const loginController = require('../controllers/loginController');
// const {body} = require('express-validator');

// //pagina de login, validar un formulario, por post validar alguno de los campos
// router.get('/login', loginController.login);
// router.post('/usuarioLogueado', loginController.logueado);
// router.post('/login', [
//     body('userName').isString().withMessage('userName invalido'),
//     body('password').isLength({min: 8}).withMessage('La contraseña debe tener 8 caracteres'),
// ] ,loginController.processLogin);

// router.post('/body', function(req, res) {
//     if (req.session.usuarioLogueado == undefined) {
//         res.send("No estas logueado");
//     } else {
//         res.send("El usuario logueado es" + req.session.usuarioLogueado.userName);
//     }
// })

// //let usuarioNoLogueado = require('../middlewares/usuarioNoLogueado');

// module.exports = router;







//muetra un listado de usuario
//router.get("/usuariosIndex",usuariosController.index)

//muestar el formulario de creacion 
//router.get("/", usuariosController.create);

//Procesa el formulario de creacion
//router.post("/register/id",upload.single("imagenUsuario"), usuariosController.procesarFormulario);
//,upload.single("name del input")//

//detallede un usuario
//router.get("/Register/:id",usuariosController.show)

module.exports = router;
