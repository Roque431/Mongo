const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { verifyExist } = require("../middlewares/verifySignUp");

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
  app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  

  app.post(
    "/api/auth/login",
    [
      verifySignUp.validarCampos, verifyExist
    ],
    
    controller.signup
  ); // es para crear nuevos usarios
  app.post(
    "/api/auth/loginEmple",
    controller.signup
  ); 

  app.get("/api/user", controller.getAllUsers); // es para logearse 

  app.delete("/api/test/adminD/:id", controller.deleteUser);

  app.put("/api/test/adminU/:id", controller.updateUser);

};
