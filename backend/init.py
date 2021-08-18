from flask import Flask,request,render_template
from flask_restful import Resource,Api
from flask_cors import CORS,cross_origin


app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/todos": {"origins": "*"}})
