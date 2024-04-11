const db = require("../models");
const Product = db.productos;

// Middleware para verificar si ya existe un producto con el mismo código o nombre
checkDuplicateCodigoOrNombre  = (req, res, next) => {
  // Código del producto
  Product.findOne({
    codigo: req.body.codigo
  }).exec((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (product) {
      res.status(400).send({ message: "Failed! Product code is already in use!" });
      return;
    }

    // Nombre del producto
    Product.findOne({
      nombre: req.body.nombre
    }).exec((err, product) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (product) {
        res.status(400).send({ message: "Failed! Product name is already in use!" });
        return;
      }

      next();
    });
  });
};

const verifyProduct = {
    checkDuplicateCodigoOrNombre
};

module.exports = verifyProduct;
