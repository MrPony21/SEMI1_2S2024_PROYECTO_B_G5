
from flask import jsonify
from db import connect

def add_review(description, score, user, travel):
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.callproc('review_insert', (description, score, user, travel))

            cursor.callproc('review_get_review_by_travel_id', (travel,))
            result = cursor.fetchall()

            total = 0
            for review in result:
                total += review['score']
            average = total / len(result)

            cursor.callproc('travel_edit_review', (travel, average))
            
            conn.commit()
        return jsonify({"message": "Review added"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

def get_review_by_travel_id(travel_id):
    try:
        conn = connect()
        with conn.cursor() as cursor:
            cursor.callproc('review_get_review_by_travel_id', (travel_id,))
            result = cursor.fetchall()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
