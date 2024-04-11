const controller = require("../controllers/product.controller");
const { verifyProduct } = require("../middlewares");

module.exports = function(app) {
  // Middleware para configurar los encabezados CORS
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      "http://127.0.0.1:5500"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    next();
  });
  

  // Ruta para crear un producto
  app.post(
    "/api/products",
    [
      verifyProduct.checkDuplicateCodigoOrNombre  
    ],
    controller.createProduct 
  );

  // Ruta para obtener todos los productos
  app.get(
    "/api/products",
    controller.getAllProducts
  );

  // Ruta para obtener productos por categoría
  app.get(
    "/api/products/categoria/:categoria",
    controller.getProductsByCategory
  );
};
