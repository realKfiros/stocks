import requests
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import joblib
from trainer import train_model
import pandas as pd

load_dotenv(".env.local")

app = Flask(__name__)

@app.route('/api/stock/<symbol>', methods=['GET'])
def get_stock_data(symbol):
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=1min&apikey={os.environ["ALPHA_VANTAGE"]}'
    response = requests.get(url)
    data = response.json()
    if 'Time Series (1min)' in data:
        latest_data = next(iter(data['Time Series (1min)'].values()))
        stock_data = {
            'symbol': symbol,
            'price': latest_data['1. open'],
        }
    else:
        stock_data = {
            'symbol': symbol,
            'price': 'Data not available'
        }
    return jsonify(stock_data)

@app.route('/api/predict/<symbol>', methods=['POST'])
def predict(symbol):
    print(symbol)
    if not os.path.isfile(f'models/{symbol}_model.pkl'):
        train_model(symbol)
    model = joblib.load(f'models/{symbol}_model.pkl')
    data = request.get_json()
    df = pd.DataFrame([data])
    prediction = model.predict(df)
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)