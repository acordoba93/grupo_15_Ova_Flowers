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

router.get("/", usersController.index);
router.get("/admin", admin, usersController.admin);

router.get("/login", usersController.login);
router.post("/login", usersController.processLogin);

router.get("/register", usersController.visualizarRegistro);
router.post("/register", (upload.single('imagen')), validarUsuarioNuevo, usersController.create);
router.get("/detail/:id", usersController.detalle);

router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", (upload.single('imagen')), usersController.update);

router.delete("/delete/:id", usersController.destroy);

router.get("/recuperarPassword", usersController.recuperarPassword);


module.exports = router;
