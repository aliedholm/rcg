import pymongo
from pymongo import MongoClient

client = MongoClient()

db = client.test_database

collection = db.test_collection


