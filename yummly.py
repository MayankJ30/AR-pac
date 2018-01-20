import requests
import json
from pprint import pprint
import random

ingList = []

site = "http://api.yummly.com/v1/api/recipes"
APP_ID = "9c8757df"
API_KEY = "995152408aed5ea7578afe4e96062cdb"

url = site + "?_app_id=" + APP_ID + "&_app_key=" + API_KEY

params = {
    "q": "cake",
    "maxResult": 100,
    "allowedCourse": [
        "Dessert"
    ]
}

response = requests.get(url, data=params)

#pprint(response.json()['matches'][0])

#pprint(response.json()['matches'][0]['ingredients'])

biggestAss = "Type, Ing, Ing1, Ing2, Ing3, Ing4, Ing5, Ing6, Ing7, Ing8, Ing9, Ing10, Rating\n"
#biggestAss = ""

for i in range(0, 100):

    rating = (response.json()['matches'][i]['rating'] - 1) / 4
    bigAss = ""

    if len(response.json()['matches'][i]['ingredients']) > 11:
        continue


    for ing in response.json()['matches'][i]['ingredients']:
        bigAss = bigAss + "Dessert, " + ing

        tmplist = []
        for subing in response.json()['matches'][i]['ingredients']:
            if ing != subing:
                tmplist.append(subing)

        random.shuffle(tmplist)

        count = 0
        for subing in tmplist:
            bigAss = bigAss + ", " + subing
            count += 1

        while count < 10:
            bigAss = bigAss + ", null"
            count += 1

        bigAss = bigAss + ", " + str(rating)

        bigAss = bigAss + "\n"

    #bigAss = bigAss + "\n"
    biggestAss = biggestAss + bigAss

print(biggestAss)

myfile = open("dessert.csv", mode="a", encoding="utf-8")
myfile.write(biggestAss)
myfile.close()




#pprint(response.json()['matches']['rating'])

#print(json.dumps(response.text, sort_keys=True, indent=4))

#print(response.text)