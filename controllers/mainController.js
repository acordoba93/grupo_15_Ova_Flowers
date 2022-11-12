const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
    visualizarHome: function ( req , res) {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        const productosEnOferta = products.filter((p) => p.categoria == "oferta");
        const productosPrecioDeLista = products.filter((p) => p.categoria == "precio de lista");



        res.render("home", { productos: products, productosEnOferta, productosPrecioDeLista });
    },
    search: (req, res) => {
      const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  
      let search = req.query.keywords;
      search = search.toLowerCase();
  
      const resultado = products.indexOf((p) => {
        console.log(p.nombre);
        p.nombre.toLowerCase().includes(search.toLowerCase())
      });
      console.log(resultado);
  
      res.render("resultado", { productos: resultado, search: search });
      },
    };


module.exports = mainController;

