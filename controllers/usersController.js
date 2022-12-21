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
  processLogin: async (req, res) => {

    const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('/login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        try {

          let userToLogin = await db.Users.findOne({
              where: {
                  email: req.body.email
              }
          })
      
      if(userToLogin) {
      let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        if(req.body.remember_user) {
          res.cookie("correo", req.body.email, { maxAge: (1000 * 60) * 20 })
        }
        return res.redirect("/userProfile");
      }
      return res.render('Login', {
        errors: {
          password: {
            msg: 'Las credenciales son inválidas'
          }
        }
      });
    }
    return res.render('Login', 
      /*errors: {
        email: {
          msg: 'No se encuentra este email en nuestra base de datos'
        }
      }
    } */ 
    );
  } catch (error) {
      console.log(error)
  }
},
register: (req, res) => {
  return res.render('/Register')
},
processRegister: async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
      return res.render('/Register', {
          errors: resultValidation.mapped(),
          oldData: req.body
      });
  }

  try {
      let usuarioInDB = await db.Users.findOne({
          where: {
              email: req.body.email
          }
      })

      if (usuarioInDB) {
          res.render('/Register', {
              errors: {
                  email: { msg: 'Este email ya esta registrado' }
              },
              oldData: req.body
          }
          )

      }

      let userToCreate = await db.Users.create(
          {
              id: Number(String(Date.now()).slice(6)),
              usuario_Id: 1,
              nombre_Completo: req.body.nombre_,
              email: req.body.email,
              contraseña: bcrypt.hashSync(req.body.contraseña, 10),
              celular: req.body.celular,
              repetir_Contraseña: bcrypt.hashSync(req.body.contraseña, 10),
              pais_de_nacimiento: req.body.pais_de_nacimiento
          })

  } catch (error) {
      console.log(error)
  }

  return res.redirect('/login')
},

 admin: (req, res) => {
    res.send("Hola Administrador: " + req.query.user);
  },
  profile: (req, res) => {
    console.log(req.session.userLogged)
    res.render('userProfile', {
        admin: req.session.admin,
        guest: req.session.guest,
        user: req.session.userLogged
    });

},
edit: (req, res) => {
  db.User.findByPk(req.params.id)
      .then(userProfile => {
          db.Role.findAll()
          .then(roles =>
              res.render('FormEditarUsuario', { userProfile: userProfile, roles : roles })
          )
      })
      .catch(err => {
          console.log('Ha ocurrido un error: ' + err);
      })
  
  
  },
  update: (req, res) => {

    db.User.findByPk(req.params.id)
        .then(userToEdit => {
            let image;
            (req.file) ? image = req.file.filename : image = userToEdit.image;


            let validationResults = validationResult(req);
            let errors = validationResults.mapped();

            if (validationResults.errors.length === 0) {

                db.User.update({
        nombre : req.body.nombre,
        email : req.body.email,
        usuario : req.body.usuario,
        genero : req.body.genero,
        password : req.body.password
      },
    
    {
      where: { id: req.params.id }
  })
  .then(() => {
      res.redirect('/products');
  })
  .catch(err => {
      console.log('Ha ocurrido un error: ' + err);
  })
} else {
console.log('Error en el else', errors);
res.render('FormEditarProducto', { userProfile: userToEdit, errors: errors, oldData: req.body });
}
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

  destroy: (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    users = users.filter((p) => p.id != req.params.id);
    const data = JSON.stringify(users, null, " ");
    fs.writeFileSync(usersFilePath, data);
    res.redirect("/users");
  },
  };


module.exports = usersController;


/*const usersController = {
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

module.exports = usersController;*/
