import sys
sys.path.append("~/Github/rcg/python/")
from ParseAsJson import ParseAsJson
from datetime import datetime
result1,tank1 = ParseAsJson(datetime.now().strftime("%Y-%m-%d %H:%M:%S"),"bioTank 2 PH 13.5")
result2,tank2 = ParseAsJson(str(datetime.now()),"FishTank 3 EC 13")
print result1
print tank1
print result2
print tank2
