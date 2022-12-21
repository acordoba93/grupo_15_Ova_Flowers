const { validationResult } = require('express-validator');
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const db = require("..//database/models");
const { promiseImpl } = require('ejs');

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productoController = {
  create: function (req, res) {
    /*db.producto.findAll()
         .then(function(producto) {
          return res.render("creacionProducto", {producto:producto});
         })*/
        
        return res.render("creacionProducto");
      
  },
  seleccionado: function (req, res) {
    db.producto.create({
      color: req.body.color,
      producto: req.body.producto,
      talle: req.body.talle,
      categoria: req.body.categoria,

    });
    res.redirect("/productoFinal")
  },
  listado: function (req, res) {
    db.producto.findAll()
         .then(function(productos) {
          res.render("listaDeProductos", {productos:productos});
         })
  },
  detalle: function(req, res) {
    db.productos.findByPk(req.params.id, {
      include: [{association: "color"}, {association: "talle"}, {association: "categoria"}]
    })
        .then(function(productos) {
          res.render("detalleProducto", {productos:productos});
        })
  },
  editar: function (req, res) {
    let pedidoProducto = db.producto.findByPk(req.params.id);

    let pedidoCategoria = db.categoria.findAll();

    Promise.all([pedidoProducto, pedidoCategoria])
        .then(function([producto, categoria]){
          res.render("editarProducto", {producto:producto, categoria:categoria});
        })
  },
  actualizar: function(req, res) {
    db.producto.update({
      color: req.body.color,
      producto: req.body.producto,
      talle: req.body.talle,
      categoria: req.body.categoria,

    }, {
      where: {
        id: req.params.id
      }
    });

    res.redirect("/products/" + req.params.id)

  },
  borrar: function(req, res) {
    db.producto.destroy({
      where: {
        id: req.params.id
      }
    })

    res.redirct("/producto");
  }
}

module.exports = controller;

/*const controller = {
  index: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    res.render("products", { productos: products });
  },
  detalle: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    const producto = products.find((p) => p.id == req.params.id);
    res.render("ProductDetail", { producto});
  },
  create: function(req, res) {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    res.render("FormCrearProducto");
  },
  store: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    const productoNuevo = {
      id: Date.now(),
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      talle: req.body.talle,
      precio: req.body.precio,
      categoria: req.body.categoria,
      imagen: "ova-logo.jpg"
    };
    if(req.file){
      productoNuevo.imagen = req.file.filename
    }

    products.push(productoNuevo)

    const data = JSON.stringify(products, null, " ");
    fs.writeFileSync(productsFilePath, data);

    res.redirect("/products");

  },
  edit: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    const producto = products.find((p) => p.id == req.params.id);

    res.render("FormEditarProducto", { productToEdit: producto });
  },
  update: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    products.forEach(p => {
      if(p.id == req.params.id){
        p.nombre = req.body.nombre,
        p.precio = req.body.precio,
        p.talle = req.body.talle,
        p.categoria = req.body.categoria,
        p.descripcion = req.body.descripcion
      } 
    });
    const data = JSON.stringify(products, null, " ");
    fs.writeFileSync(productsFilePath, data);

    res.redirect("/products/detalle/" + req.params.id)
  },

  destroy: (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    products = products.filter((p) => p.id != req.params.id);

    const data = JSON.stringify(products, null, " ");
    fs.writeFileSync(productsFilePath, data);
    res.redirect("/products");  
  },
};

module.exports = controller;*/