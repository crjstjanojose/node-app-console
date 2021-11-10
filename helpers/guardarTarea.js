const fs = require("fs");

const archivo = "./db/data.json";

const gurdarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }

  const info = fs.readFileSync(archivo, "utf8");
  const data = JSON.parse(info);
  return data;
};

module.exports = { gurdarDB, leerDB };
