import pymongo
from pymongo import MongoClient

def ChooseCollection(db,tank_type):
	if tank_type=="Fish":
		return db.Fish_collection
	else:
		return db[tank_type]
