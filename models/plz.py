from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the models and scalers
try:
    classifier = joblib.load('diabetes.pkl')
    scaler = joblib.load('scaler1.pkl')
    logistic = joblib.load('model2.pkl')
    print("Models and scalers loaded successfully.")
except Exception as e:
    print("Error loading models or scalers:", str(e))
    classifier = None
    scaler = None
    logistic = None

@app.route('/predict1', methods=['POST'])
def predict1():
    if not classifier or not scaler:
        return jsonify({'error': 'Model or scaler not loaded properly'}), 500

    try:
        data = request.get_json(force=True)
        print("Received data for predict1:", data)

        # Extract the input data from 'input_data'
        input_data = data.get('input_data')
        if not input_data:
            return jsonify({'error': 'No input data provided'}), 400

        # Validate and extract the required fields
        required_fields = ['pregnancies', 'glucose', 'bp', 'skin', 'insulin', 'bmi', 'dpf', 'age']
        input_values = []

        for field in required_fields:
            value = input_data.get(field)
            if value is None:
                return jsonify({'error': f'Missing value for {field}'}), 400
            try:
                input_values.append(float(value))
            except ValueError:
                return jsonify({'error': f'Invalid value for {field}, must be a number'}), 400

        input_values = np.array([input_values])
        print("Input data before scaling:", input_values)

        # Standardize the input data
        std_data = scaler.transform(input_values)
        print("Input data after scaling:", std_data)

        # Make prediction
        prediction = classifier.predict(std_data)
        print("Prediction:", prediction)

        # Interpret the prediction result
        result = 'The person is diabetic' if prediction[0] == 1 else 'The person is not diabetic'

        # Return the result as a JSON response
        return jsonify({'prediction': result})
    except Exception as e:
        print("Error in predict1:", str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/predict2', methods=['POST'])
def predict2():
    if not logistic:
        return jsonify({'error': 'Model not loaded properly'}), 500

    try:
        data = request.get_json(force=True)
        print("Received data for predict2:", data)

        # Extract the input data from 'input_data'
        input_data = data.get('input_data')
        if not input_data:
            return jsonify({'error': 'No input data provided'}), 400

        # Validate and extract the required fields
        required_fields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
        input_values = []

        for field in required_fields:
            value = input_data.get(field)
            if value is None:
                return jsonify({'error': f'Missing value for {field}'}), 400
            try:
                input_values.append(float(value))
            except ValueError:
                return jsonify({'error': f'Invalid value for {field}, must be a number'}), 400

        input_values = np.array([input_values])
        print("Input data:", input_values)

        # Make prediction
        prediction = logistic.predict(input_values)
        print("Prediction:", prediction)

        # Interpret the prediction result
        result = 'The person is at risk' if prediction[0] == 1 else 'The person is not at risk'

        # Return the result as a JSON response
        return jsonify({'prediction': result})
    except Exception as e:
        print("Error in predict2:", str(e))
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
