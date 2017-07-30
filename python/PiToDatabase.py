""" Help connect to the Mongodb Database
Return:
	client(Mongodb Client): The client 
	db(Mongodb Database): The database
"""

import pymongo
from pymongo import MongoClient

def setup_connection():
	client = MongoClient()

	db = client.test_database

	return client,db



