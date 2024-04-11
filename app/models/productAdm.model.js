const mongoose = require("mongoose");

const ProductosAdm= mongoose.model(
  "ProductAdm",
  new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    stock: { type: Number, required: true },
    precioCompra: { type: Number, required: true },
    precioVenta: { type: Number, required: true },
    seccion: { type: String, required: true }
  })
);

module.exports = ProductosAdm;
