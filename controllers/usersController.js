const { validationResult } = require('express-validator');
const express = require("express");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const bcryptjs = require("bcryptjs");
const user  = require("../modeloUser/user");

const usersController = {
  login: (req, res) =>{
    res.render("Login");
  },
  processLogin: (req, res) => {
    let userToLogin = user.findByField('email', req.body.email);

    if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect("/users/profile");
			} 
			return res.render('Login', {
				errors: {
					password: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('Login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});

  },
  admin: (req, res) => {
    res.send("Hola Administrador: " + req.query.user);
  },
  profile: (req, res) => {
    res.render("userProfile", {
      user: req.session.userLogged
    });
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
    res.render("userProfile", { usuario });

    },
  recuperarPassword: (req, res) =>{
    res.render("RecuperarContraseña");
    },
  create: (req, res) =>{
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    const resultValidation = validationResult(req);

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
