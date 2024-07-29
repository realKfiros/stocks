import yfinance as yf
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import os
import joblib

# Fetch historical data
def get_stock_data(symbol, start_date, end_date):
    stock_data = yf.download(symbol, start=start_date, end=end_date)
    stock_data['Return'] = stock_data['Adj Close'].pct_change()
    stock_data.dropna(inplace=True)
    return stock_data

def train_model(stock):
    stock_data = get_stock_data(stock, '2010-01-01', datetime.today().strftime('%Y-%m-%d'))

    X = stock_data[['Open', 'High', 'Low', 'Close', 'Volume']]
    y = stock_data['Return']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    print(f'Mean Squared Error: {mse}')

    if not os.path.exists('models'):
        os.makedirs('models')

    joblib.dump(model, f'models/{stock}_model.pkl')

if __name__ == '__main__':
    train_model('AAPL')