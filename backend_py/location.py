
from flask import jsonify
from db import connect
import boto3
import os
from botocore.exceptions import BotoCoreError, ClientError

# Cargar las variables de entorno
ACCESS_KEY = os.getenv('ACCESSKEY')
SECRET_ACCESS_KEY = os.getenv('SECRETACCESSKEY')
AWS_REGION = os.getenv('AWSREGION')
PLACE_INDEX_NAME = os.getenv('PLACE_INDEX_NAME')

# Configuración del cliente de AWS Location
location_client = boto3.client(
    'location',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

# Función para buscar una ubicación por nombre
def buscar_lugar_por_nombre(nombre_lugar):
    params = {
        'IndexName': PLACE_INDEX_NAME,
        'Text': nombre_lugar,
        'MaxResults': 1
    }

    try:
        response = location_client.search_place_index_for_text(**params)
        results = response.get('Results', [])

        if results:
            point = results[0]['Place']['Geometry']['Point']  # [longitud, latitud]
            return jsonify({"coordenadas": point})
        else:
            raise ValueError("No se encontró el lugar.")
    except (BotoCoreError, ClientError) as error:
        raise RuntimeError(f"Error buscando el lugar: {error}")


