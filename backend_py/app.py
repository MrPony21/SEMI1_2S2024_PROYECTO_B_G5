from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask import request

from user import get_users, add_user, edit_user, delete_user, login
from travel import get_travels, add_travel, get_travel_by_id, get_travel_score
from review import add_review, get_review_by_travel_id
from location import buscar_lugar_por_nombre
from cognito import signup, confirm_signup, signin, is_confirmed

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def index():
    return "python server is running"

@app.route('/user/all', methods=['GET'])
def users():
    return get_users()

@app.route('/user/add', methods=['POST'])
def add():
    return add_user(request.json['username'], request.json['email'], request.json['password'])

@app.route('/user/edit', methods=['PUT'])
def edit():
    return edit_user(request.json['user_id'], request.json['name'], request.json['email'], request.json['password'], request.json['points'], request.json['profile_url'])

@app.route('/user/delete', methods=['DELETE'])
def delete():
    return delete_user(request.args.get('userid'))

@app.route('/user/login', methods=['POST'])
def login_user():
    return login(request.json['username'], request.json['password'])

@app.route('/travel/all', methods=['GET'])
def travels():
    return get_travels()

@app.route('/travel/add', methods=['POST'])
def add_travel_route():
    return add_travel(request.json['name'], request.json['description'], request.json['cost'], request.json['image_link'])

@app.route('/travel/<travelid>', methods=['GET'])
def get_travel(travelid):
    print(travelid)
    return get_travel_by_id(travelid)

@app.route('/travel/score/', methods=['GET'])
def get_travel_score_route():
    return get_travel_score(request.args.get('travelid'))

@app.route('/review/add', methods=['POST'])
def review_add():
    return add_review(request.json['description'], request.json['score'], request.json['user'], request.json['travel'])

@app.route('/review/', methods=['GET'])
def review_get():
    return get_review_by_travel_id(request.args.get('travelid'))

@app.route('/location/buscar-lugar', methods=['GET'])
def buscar_lugar():
    return buscar_lugar_por_nombre(request.args.get('nombre_lugar'))

@app.route('/cognito/signup', methods=['POST'])
def signup_route():
    return signup(request.json['email'], request.json['password'])

@app.route('/cognito/confirm', methods=['POST'])
def confirm_signup_route():
    return confirm_signup(request.json['username'], request.json['code'])

@app.route('/cognito/signin', methods=['POST'])
@cross_origin(origin='http://localhost:5173', headers=['Content-Type', 'Authorization'])
def signin_route():
    return signin(request.json['username'], request.json['password'])

@app.route('/cognito/isConfirmed', methods=['GET'])
def is_confirmed_route():
    return is_confirmed(request.args.get('username'))

if __name__ == '__main__':
    app.run( host= '0.0.0.0' , debug=True , port=4000)