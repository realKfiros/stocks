from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/stock/<symbol>', methods=['GET'])
def get_stock_data(symbol):
    # Placeholder for getting stock data
    stock_data = {
        'symbol': symbol,
        'price': 100.0,  # Example price
    }
    return jsonify(stock_data)

if __name__ == '__main__':
    app.run(debug=True)