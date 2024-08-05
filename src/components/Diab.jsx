import React, { useState } from 'react';
import axios from 'axios';

const Diab = () => {
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Construct a JavaScript object with form data
        const formData = {
            pregnancies: parseInt(event.target.pregnancies.value),
            glucose: parseInt(event.target.glucose.value),
            bp: parseInt(event.target.bp.value),
            skin: parseInt(event.target.skin.value),
            insulin: parseInt(event.target.insulin.value),
            bmi: parseFloat(event.target.bmi.value),
            dpf: parseFloat(event.target.dpf.value),
            age: parseInt(event.target.age.value)
        };
    
        try {
            // Send POST request with JSON data
            const response = await axios.post('http://127.0.0.1:5000/predict1', { input_data: formData }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setPrediction(response.data.prediction);
            setError(null);
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                setError(`Error: ${error.response.data.message || 'Unable to process request'}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                setError('Error: No response received from server');
            } else {
                console.error('Error message:', error.message);
                setError(`Error: ${error.message}`);
            }
            setPrediction(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Diabetes</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="pregnancies" className="block text-gray-700 font-medium mb-2">Pregnancies</label>
                        <input type="number" id="pregnancies" name="pregnancies" className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="glucose" className="block text-gray-700 font-medium mb-2">Glucose</label>
                        <input type="number" id="glucose" name="glucose" className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bp" className="block text-gray-700 font-medium mb-2">Blood Pressure</label>
                        <input type="number" id="bp" name="bp" className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="skin" className="block text-gray-700 font-medium mb-2">Skin Thickness</label>
                        <input type="number" id="skin" name="skin" className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="insulin" className="block text-gray-700 font-medium mb-2">Insulin</label>
                        <input type="number" id="insulin" name="insulin" className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bmi" className="block text-gray-700 font-medium mb-2">BMI</label>
                        <input type="number" step="0.1" id="bmi" name="bmi" className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dpf" className="block text-gray-700 font-medium mb-2">Diabetes Pedigree Function</label>
                        <input type="number" step="0.01" id="dpf" name="dpf" className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="block text-gray-700 font-medium mb-2">Age</label>
                        <input type="number" id="age" name="age" className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
                    </div>
                </form>
                {error && <div className="mt-4 text-red-600">{error}</div>}
                {prediction && <div className="mt-4 text-gray-800">{prediction}</div>}
            </div>
        </div>
    );
};

export default Diab;
