import sys
sys.path.append("~/Github/rcg/python/")
from ParseAsJson import ParseAsJson

result1 = ParseAsJson("bioTank 2 PH 13.5")
result2 = ParseAsJson("FishTank 3 EC 13")
print result1
print result2
