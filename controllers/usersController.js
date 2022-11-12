const { validationResult } = require('express-validator');
const express = require("express");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const bcryptjs = require("bcryptjs");
const user  = require("../models/user");

const usersController = {
  login: (req, res) =>{
    res.render("Login");
    },
  admin: (req, res) => {
    res.send("Hola Administrador: " + req.query.user);
  },
  index: (req, res) =>{
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    res.render("users", { usuarios: users });
    },
  visualizarRegistro: function ( req , res) {
      res.render("Register");
    },
  detalle: (req, res) =>{
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    const usuario = users.find((p) => p.id == req.params.id);
    res.render("userDetail", { usuario });

    },
  recuperarPassword: (req, res) =>{
    res.render("RecuperarContraseña");
    },
  create: (req, res) =>{
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    const resultValidation = validationResult(req);

    let  userInDB  =  "lucasgarciacab@hotmail.com";
    
    //Usuario.findByField ( email ,  req.body.email );



    // if (userInDB) {
		// 	return res.render('Register', {
		// 		errors: {
		// 			email: {
		// 				msg: 'Este email ya está registrado'
		// 			}
		// 		},
		// 		oldData: req.body
		// 	});
		// };





  if(resultValidation.isEmpty()){

  const userNuevo = {
    id: Date.now(),
    nombre: req.body.nombre,
    nacimiento: req.body.nacimiento,
    pais: req.body.pais,
    celular: req.body.celular,
    email: req.body.email,
    usuario: req.body.usuario,
    password: bcryptjs.hashSync(req.body.password, 10),
    repetir: bcryptjs.hashSync(req.body.repetir, 10),
    imagen: req.file ? req.file.filename : "baner-ova.jpg"
    }

users.push(userNuevo);

const data = JSON.stringify(users, null, " ");
fs.writeFileSync(usersFilePath, data);

res.redirect("/users");
}else{
  return res.render('Register', {
    errors: resultValidation.mapped(),
    oldData: req.body
  })
}
  },
  edit: (req, res) => {
      const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  
      const usuario = users.find((p) => p.id == req.params.id);
  
      res.render("FormEditarUsuario", { userToEdit: usuario });
    },
    update: (req, res) => {
      const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  
      users.forEach(p => {
        if(p.id == req.params.id){
          p.nombre = req.body.nombre,
          p.email = req.body.email,
          p.usuario = req.body.usuario,
          p.genero = req.body.genero,
          p.password = req.body.password
        }
      });
      const data = JSON.stringify(users, null, " ");
      fs.writeFileSync(usersFilePath, data);
  
      res.redirect("/users/detail/" + req.params.id)
    },
    
  destroy: (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    users = users.filter((p) => p.id != req.params.id);

    const data = JSON.stringify(users, null, " ");
    fs.writeFileSync(usersFilePath, data);
    res.redirect("/users");
  },
  };

module.exports = usersController;

// const fs = require("fs");
// const path = require("path");

// const usersFilePath = path.join(__dirname, "../data/users.json");
// const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// const loginController = {
//     visualizarLogin: function ( req , res) {
//         res.render("login")
//     },



// // proceso de login, leer los usuarios y verifica la contraseña

// login: function (req, res) {
//        return res.render('home');
// },

// logueado: function(req, res){
//     console.log("login exitoso");
//     return res.render('usuarioLogueado');
// },

// processLogin: function(req, res) {
//     let errors = validationResult(req);
//     if (errors.isEmpty()) {
//         let usersJSON = fs.readFileSync('users.json', { encoding: "UTF-8"})
//         let users;
//         if (usersJSON == "") {
//             users = [];
//         } else {
//             users = JSON.parce(usersJSON);
//         }
//         for (let i = 0; i < users.length; i++) {
//             if (users[i].userName == req.body.urerName) {
//                 if (bcrypt.compareSync(req.body.password, users[i].password))
//                      usuarioALoguearse = users[i];
//                     break;
//                }
//            }
                
//         }
//         if (usuarioALoguearse == undefined) {
//             return res.render('login', {errors: [
//                 {msg: 'Credenciales invalidas'}
//             ]});
            
        
//         req.session.usuarioLogueado = usuarioALoguearse;    
//     } else {
//         return res.render('login', {errors: errors.errors});
//     }
// }

// }

// module.exports = loginController;
