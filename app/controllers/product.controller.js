const db = require("../models");
const Productos = db.productos;

// Crear un nuevo producto
exports.createProduct = (req, res) => {
    // Validar la solicitud
    if (!req.body.codigo || !req.body.cantidad || !req.body.nombre || !req.body.precioVenta || !req.body.cantidad || !req.body.subtotal) {
        return res.status(400).send({ message: "Todos los campos son obligatorios." });
    }

    // Crear un nuevo producto
    const producto = new Productos({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        precioVenta: req.body.precioVenta,
        cantidad: req.body.cantidad,
        subtotal: req.body.precioVenta
    });

    // Guardar el producto en la base de datos
    producto.save((err, producto) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Compra realizada correctamente.", producto });
    });
};

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
    Productos.find({}, (err, productos) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send(productos);
    });
};

// Obtener un producto por su 
exports.getProductByName = (req, res) => {
    const productName = req.params.name; // Nombre del producto pasado como parámetro

    Productos.findOne({ nombre: productName }, (err, producto) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!producto) {
            res.status(404).send({ message: `Producto con nombre "${productName}" no encontrado.` });
            return;
        }
        res.send(producto);
    });
};


// Actualizar un producto por su ID
exports.updateProductById = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Los datos a actualizar no pueden estar vacíos." });
    }

    Productos.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }, (err, producto) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!producto) {
            res.status(404).send({ message: `No se pudo actualizar el producto con ID ${req.params.id}. Producto no encontrado.` });
            return;
        }
        res.send({ message: "Producto actualizado exitosamente." });
    });
};

// Eliminar un producto por su ID
exports.deleteProductById = (req, res) => {
    Productos.findByIdAndRemove(req.params.codigo, { useFindAndModify: false }, (err, producto) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!producto) {
            res.status(404).send({ message: `No se pudo eliminar el producto con ID ${req.params.id}. Producto no encontrado.` });
            return;
        }
        res.send({ message: "Producto eliminado exitosamente." });
    });
};

// Obtener productos por categoría
