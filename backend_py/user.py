
from flask import jsonify
from db import connect

def get_users():
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM User")
            result = cursor.fetchall()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

def add_user(username, email, password):
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.callproc('user_insert', (username, email, password))
            result = cursor.fetchone()
            conn.commit()
        return jsonify({"message": result['user_id']}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

def edit_user(user_id, newUsername, newCorreo, newPassword, newPoints, newPhoto ):
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.callproc('user_update', (user_id, newUsername, newCorreo, newPassword, newPoints, newPhoto))
            conn.commit()
        return jsonify({"message": "User updated"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

def delete_user(user_id):
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.callproc('user_delete', (user_id,))
            conn.commit()
        return jsonify({"message": "User deleted"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

def login (username, password):
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.callproc('user_login', (username, password))
            result = cursor.fetchone()

        return jsonify({"message": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()