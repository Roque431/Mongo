const mongoose = require("mongoose");

const Productos = mongoose.model(
  "Productos",
  new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    precioVenta: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    subtotal: { type: Number, required: true }
  })
);

module.exports = Productos;
