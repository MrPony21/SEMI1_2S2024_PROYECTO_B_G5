
import pymysql
from dotenv import load_dotenv
import os

# Cargar las variables de entorno
load_dotenv()

# Obtener las variables de entorno
DB_HOST = os.getenv('HOSTDB')
DB_PORT = int(os.getenv('PORTDB'))
DB_USER = os.getenv('USERDB')
DB_PASSWORD = os.getenv('PASSWORDDB')
DB_NAME = os.getenv('SHEMADB')

#conexión a la base de datos
def connect():
    try:
        conn = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT or 3306,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            cursorclass=pymysql.cursors.DictCursor
        )
        return conn
    except Exception as e:
        print("Error de conexión a MySQL:", e)
        return None