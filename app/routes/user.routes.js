const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const rateLimit = require("express-rate-limit");

// Configura el rate limiting
const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 6, // Limita cada IP a 6 peticiones por el tiempo definido con "windowMs"
    message: "Demasiadas peticiones realizadas, intenta después de 1 hora"
});

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Aplica el rate limiting a las rutas específicas
  app.get("/api/test/all", accountLimiter, controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken, accountLimiter], controller.userBoard);
  
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin, accountLimiter],
    controller.adminBoard
  );

};
