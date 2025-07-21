require("dotenv").config(); // Cargar variables de entorno
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "miclaveultrasecreta123*"; // Leer directamente de .env

const rutasProtegidas = (req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      mensaje: "Token no proveída.",
    });
  }
};

module.exports = rutasProtegidas;
