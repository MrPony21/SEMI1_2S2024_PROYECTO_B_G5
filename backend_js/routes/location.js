const express = require('express');
const AWS = require('aws-sdk');
require('dotenv').config();

const router = express.Router();

// Configuración de AWS
AWS.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.AWSREGION
});

// Crear instancia del servicio de localización
const locationService = new AWS.Location();

// Función para buscar ubicación por nombre
const buscarLugarPorNombre = async (nombreLugar) => {
  const params = {
    IndexName: process.env.PLACE_INDEX_NAME,
    Text: nombreLugar,
    MaxResults: 1
  };

  return new Promise((resolve, reject) => {
    locationService.searchPlaceIndexForText(params, (err, data) => {
      if (err) {
        reject("Error buscando el lugar: " + err);
      } else {
        const place = data.Results[0]?.Place;
        if (place) {
          resolve(place.Geometry.Point); // [longitud, latitud]
        } else {
          reject("No se encontró el lugar.");
        }
      }
    });
  });
};

// Ruta para buscar lugar por nombre (GET)
// Ruta para buscar lugar por nombre (GET)
router.get('/buscar-lugar', async (req, res) => {
    const { nombre_lugar } = req.query; // Asegúrate de extraer 'nombre_lugar' de los query parameters
    if (!nombre_lugar) {
      return res.status(400).json({ error: 'El parámetro nombre_lugar es requerido.' });
    }
  
    try {
      const coordenadas = await buscarLugarPorNombre(nombre_lugar);
      res.json({ coordenadas });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  

// Exportar el router
module.exports = router;
