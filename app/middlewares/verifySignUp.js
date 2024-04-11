const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateFields = (req, res, next) => {
  // Verificar username
  const { username, clave } = req.body;
  if (req.body.username) {
    User.findOne({ username, clave }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }

      // Si el username no está en uso, continuar con la verificación
      checkPassword();
    });
  } else {
    checkPassword();
  }

  // Verificar password
  function checkPassword() {
    if (req.body.password) {
      // Aquí puedes agregar la lógica de verificación de la contraseña si es necesario
    }

    // Si no hay problemas con la contraseña, continuar con la verificación del campo numCont
    checkNumCont();
  }

  // Verificar numCont
  function checkNumCont() {
    if (req.body.numCont) {
      User.findOne({ numCont: req.body.numCont }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (user) {
          res.status(400).send({ message: "Failed! numCont is already in use!" });
          return;
        }

        // Si numCont no está en uso, continuar con la ejecución
        next();
      });
    } else {
      // Si no se proporciona el campo numCont, continuar con la ejecución
      next();
    }
  }
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

validarCampos = (req, res, next) => {
  try {
    const { username, password, turno, numCont, clave } = req.body;
    if (!req.body) return res.status(400).json({ message: "is required all fields" });
    if (!username && !password && !turno && !numCont && !clave) return res.status(400).json({ message: "please complete fields" });
    next();
  } catch (error) {
      return res.status(500).json({message: "error validate fields"});
  }
}

const verifyExist = (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: "Please provide a username" });

    User.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      if (user) {
        return res.status(400).json({ message: "Failed! Username is already in use!" });
      }
      
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Error while searching for existing user" });
  }
};

const verifySignUp = {
  checkDuplicateFields,
  checkRolesExisted,
  validarCampos,
  verifyExist 
};

module.exports = verifySignUp;
