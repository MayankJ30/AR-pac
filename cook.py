import requests
from pprint import pprint
import random
import boto3

# TODO: Get ings and type from user
ingList = ['flour', 'milk', 'eggs', 'ham', 'bacon']
type = 'breakfast'

modelid = 'ml-tbDcW347CPQ'
endpoint = 'https://realtime.machinelearning.us-east-1.amazonaws.com'

scores = []

for ing in ingList:

    Record = {}
    Record['Type'] = type
    Record['Ing'] = ing

    randlist = []
    for subing in ingList:
        if ing != subing:
            randlist.append(subing)

    #random.shuffle(randlist)

    count = 1
    for i in range(0, len(randlist)):
        Record['Ing' + str(count)] = randlist[i]
        count += 1

    while count < 11:
        Record['Ing' + str(count)] = 'null'
        count += 1

    #pprint(training)

    client = boto3.client('machinelearning')
    responseML = client.predict(MLModelId=modelid, Record=Record, PredictEndpoint=endpoint)

    #pprint(responseML)

    scoreOfIng = responseML['Prediction']['predictedValue']
    #print(scoreOfIng)

    scores.append((scoreOfIng, ing))

scores.sort(reverse=True)

#print(scores)

spoonQuery = ""
for item in scores:
    spoonQuery = spoonQuery + item[1] + ","

#print(spoonQuery)

API_KEY = "4VVR9RpW3LmshLESVH5ffBmRdw5Np1TxZnBjsn2NN4SDYP70QS"

url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients"

params={
    "fillIngredients": "false",
    "ingredients": spoonQuery,
    "number": 9
}

headers={
    "X-Mashape-Key": API_KEY,
    "Accept": "application/json"
}

response = requests.get(url, headers=headers, params=params)
recipeData = response.json()

outputData = []

for i in range(0, 9):
    recipe = {}
    recipe['title'] = recipeData[i]['title']
    recipe['image'] = recipeData[i]['image']
    recipe['link'] = (recipeData[i]['image'].replace('recipeImages', 'recipes'))[:-4]
    recipe['usedIngredientCount'] = recipeData[i]['usedIngredientCount']
    recipe['missedIngredientCount'] = recipeData[i]['missedIngredientCount']

    outputData.append(recipe)

pprint(outputData)
