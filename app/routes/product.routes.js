const controller = require("../controllers/product.controller");
const { verifyProduct } = require("../middlewares");

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
  
  //para obtener por nombre
  app.get("/api/products/:name", controller.getProductByName);


};

  