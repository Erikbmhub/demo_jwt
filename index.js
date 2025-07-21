require("dotenv").config(); // Cargar variables de entorno
const express = require("express"),
  jwt = require("jsonwebtoken"),
  rutasProtegidas = require("./middlewares/rutasProtegidas"), // Importar middleware
  app = express();

// Constante para la clave secreta
const JWT_SECRET = process.env.JWT_SECRET || "miclaveultrasecreta123*";

// 1
app.use(express.urlencoded({ extended: true }));

// 2
app.use(express.json());

// 3
app.get("/", function (req, res) {
  res.json({ message: "recurso de entrada" });
});

// 4
/* 
POST /autenticar
{
  "usuario":"alex",
  "contrasena":"123456"
} 
*/
// Validación de entrada para el endpoint /autenticar
app.post("/autenticar", (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ success: false, message: "Faltan datos de usuario o contraseña" });
  }

  if (usuario === "alex" && contrasena === "123456") {
    const payload = {
      check: true,
      user: "alex",
    };
    const token = jwt.sign(payload, JWT_SECRET, { // Usar la constante JWT_SECRET
      expiresIn: "60000ms", // 60 segundos para que expire
    });
    res.status(200).json({
      success: true,
      message: "Autenticación correcta",
      token: token,
    });
  } else {
    res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
  }
});

// Se aplica Middleware para proteger la ruta/datos
app.get("/datos", rutasProtegidas, (req, res) => {
  // Consulta a la "BBDD"
  const datos = [
    { id: 1, nombre: "Birja" },
    { id: 2, nombre: "Muchelle" },
    { id: 3, nombre: "Alvaru" },
  ];

  res.status(200).json(datos);
});

// Middleware para manejar errores genéricos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Error interno del servidor" });
});

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
