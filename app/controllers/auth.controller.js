const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    id: req.body.id,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    turno: req.body.turno,
    numCont: req.body.numCont,
    clave: req.body.clave
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  console.log (req.body);
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        turno: req.body.turno,
        numCont: req.body.numCont,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.deleteUserByClave = (req, res) => {
  const clave = req.params.clave;

  User.findOneAndDelete({clave}, (err, user) => {
    if (err) {
      console.error(`Error al eliminar el usuario por clave ${clave}:`,error);
      return res.status(500).send({ message: "Error interno del servidor al eliminar el usurio" });
    }
    if (!user) {
      return res.status(404).send({ message: `No se encontró el usuario con clave ${clave}.` });
      
    }
    // Si se elimina el usuario correctamente, responder con un mensaje de Exito
    return res.send({ message:  `Usuario con código ${clave} eliminado exitosamente.` });
  });
};

// Función para actualizar un usuario
  exports.updateUserByCodigo = (req, res) => {
    const codigo = req.params.codigo;
    if (!req.body) {
      return res.status(400).send({ message: "Los datos a actualizar no pueden estar vacíos." });
    }

    User.findOneAndUpdate({ codigo: req.params.codigo }, req.body, { new: true, useFindAndModify: false },  (err, user) => {
        if (err) {
          console.error('Error al actualizar el usuario:', err);
          res.status(500).send({ message: "Error al actualizar el usuario." });
          return;
      }
      if (!user) {
          res.status(404).send({ message: `No se pudo actualizar el usuario con código ${req.params.codigo}. Usuario no encontrado.` });
          return;
      }
      res.send({ message: "Usuario actualizado exitosamente.", user });
    });
  };

exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(users);
  });
};
