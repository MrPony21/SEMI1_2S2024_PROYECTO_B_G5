
from flask import jsonify
from db import connect

def get_travels():
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM Travel")
            result = cursor.fetchall()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

def add_travel(name, description, price, photo):
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.callproc('travel_insert', (name, description, price, photo, 0, 0))
            conn.commit()
        return jsonify({"message": "Travel added"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

def get_travel_by_id(travel_id):
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.callproc('travel_get_travel_by_id', (travel_id,))
            result = cursor.fetchone()
        return jsonify({"message": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

def get_travel_score(travel_id):
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.callproc('travel_get_score_by_id', (travel_id,))
            result = cursor.fetchall()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()