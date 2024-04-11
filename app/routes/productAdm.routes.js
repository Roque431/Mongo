const controller = require("../controllers/productAdmin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      ""
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    next();
    
  });
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

  // Ruta para crear un nuevo producto
  app.post(
    "/api/productsAdmin",
    controller.createProductAdm
  );

  // Ruta para obtener todos los productos
  app.get(
    "/api/productsAdmin",
    controller.getAllProducts
  );

  // Ruta para obtener un producto por su ID
  app.get(
    "/api/products/:id",
    controller.getProductById
  );

  // Ruta para actualizar un producto por su ID
  app.put(
    "/api/products/:codigo",
    controller.updateProductByCodigo
  );

  // Ruta para eliminar un producto por su ID
  app.delete(
    "/api/products/:codigo",
    controller.deleteProductByCodigo
  );
};

