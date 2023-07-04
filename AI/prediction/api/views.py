from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from .storedPrediction import predictionResponse
import csv

def find_mapped_row_number(csv_file, target_string):
    with open(csv_file, 'r') as file:
        reader = csv.reader(file)
        unique_values = set()
        for row in reader:
            if len(row) > 0:
                unique_values.add(row[0])
            if row[0] == target_string:
                break

    if target_string in unique_values:
        target_index = list(unique_values).index(target_string)
        mapped_row_number = (target_index * 4999) // len(unique_values)
        return mapped_row_number

    return None


@api_view(['GET'])
def predict(request, symbol):
    
    try:
        # getting the prediction from the stored data
        getRowNumber = find_mapped_row_number('./api/dataset.csv', symbol)

        if(getRowNumber == None):
            result_prediction = {
                'error' : '1',
                'message' : 'Symbol not found',
            }
            return Response(result_prediction)
        
        prediction = predictionResponse[getRowNumber]

        result_prediction = {
            'error' : '0',
            'message' : 'Successfull',
            'prediction' : prediction,
        }

    except Exception as e:
        result_prediction = {
            'error' : '2',
            "message": str(e)
        }

    return Response(result_prediction)
