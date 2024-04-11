const db = require("../models");
const ProductosAdm = db.productadms;



// Crear un nuevo producto
exports.createProductAdm = (req, res) => {
    // Validar la solicitud
    if (!req.body.codigo || !req.body.nombre || !req.body.stock || !req.body.precioCompra || !req.body.precioVenta || !req.body.seccion) {
        return res.status(400).send({ message: "Todos los campos son obligatorios." });
    }

    // Crear un nuevo producto
    const productoAdmin = new ProductosAdm({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        stock: req.body.stock,
        precioCompra: req.body.precioCompra,
        precioVenta: req.body.precioVenta,
        seccion: req.body.seccion
    });

    // Guardar el producto en la base de datos
    productoAdmin.save((err, productosGuardados) => {
        if (err) {
            res.status(500).send({ message: "Error al crear el productoAdm." });
            return;
        }
        res.send({ message: "Producto creado exitosamente.", productosGuardados});
    });
};

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
    ProductosAdm.find({}, (err, productos) => {
        if (err) {
            res.status(500).send({ message: "Error al obtener los productos." });
            return;
        }
        res.send(productos);
    });
};

// Obtener un producto por su ID
exports.getProductById = (req, res) => {
    ProductosAdm.findById(req.params.id, (err, producto) => {
        if (err) {
            res.status(500).send({ message: "Error al obtener el producto." });
            return;
        }
        if (!producto) {
            res.status(404).send({ message: `Producto con ID ${req.params.id} no encontrado.` });
            return;
        }
        res.send(producto);
    });
};

// Actualizar un producto por su ID
exports.updateProductByCodigo = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Los datos a actualizar no pueden estar vacíos." });
    }

    ProductosAdm.findOneAndUpdate({ codigo: req.params.codigo }, req.body, { new: true, useFindAndModify: false }, (err, producto) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).send({ message: "Error al actualizar el producto." });
            return;
        }
        if (!producto) {
            res.status(404).send({ message: `No se pudo actualizar el producto con código ${req.params.codigo}. Producto no encontrado.` });
            return;
        }
        res.send({ message: "Producto actualizado exitosamente.", producto });
    });
};


// Eliminar un producto por su codigo


exports.deleteProductByCodigo = (req, res) => {
    const codigo = req.params.codigo; // Almacenar el código del parámetro en una variable

    ProductosAdm.findOneAndDelete( {codigo} , (err, producto) => { // Buscar y eliminar el producto por su código
        if (err) {
            console.error(`Error al eliminar el producto con código ${codigo}:`, err); // Registrar el error en la consola
            return res.status(500).send({ message: "Error interno del servidor al eliminar el producto." }); // Responder con un error 500
        }
        if (!producto) {
            // Si el producto no se encuentra en la base de datos, responder con un error 404
            return res.status(404).send({ message: `No se encontró el producto con código ${codigo}.` });
        }
        // Si se elimina el producto correctamente, responder con un mensaje de éxito
       return res.send({ message: `Producto con código ${codigo} eliminado exitosamente.` });
    });
};


