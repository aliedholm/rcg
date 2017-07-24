import pymongo
from pymongo import MongoClient

def setup_connection():
	client = MongoClient()

	db = client.test_database

	collection = db.Fish_Tank_Collection

	return client,db,collection

def pi_to_database(result_dict):


