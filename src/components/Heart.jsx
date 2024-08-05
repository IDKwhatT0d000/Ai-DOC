import React, { useState } from 'react';
import axios from 'axios';

const Heart = () => {
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Construct a JavaScript object with form data
        const formData = {
            age: parseInt(event.target.age.value),
            sex: parseInt(event.target.sex.value),
            cp: parseInt(event.target.cp.value),
            trestbps: parseInt(event.target.trestbps.value),
            chol: parseInt(event.target.chol.value),
            fbs: parseInt(event.target.fbs.value),
            restecg: parseInt(event.target.restecg.value),
            thalach: parseInt(event.target.thalach.value),
            exang: parseInt(event.target.exang.value),
            oldpeak: parseFloat(event.target.oldpeak.value),
            slope: parseInt(event.target.slope.value),
            ca: parseInt(event.target.ca.value),
            thal: parseInt(event.target.thal.value),
        };
    
        try {
            // Send POST request with JSON data
            const response = await axios.post('http://127.0.0.1:5000/predict2', { input_data: formData }, {
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
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Heart Health Risk Assessment</h2>
                <form onSubmit={handleSubmit}>
                    {['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'].map(field => (
                        <div className="mb-4" key={field}>
                            <label htmlFor={field} className="block text-gray-700 font-medium mb-2">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field === 'oldpeak' ? 'number' : 'number'}
                                step={field === 'oldpeak' ? '0.1' : '1'}
                                id={field}
                                name={field}
                                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Submit
                        </button>
                    </div>
                </form>
                {error && <div className="mt-4 text-red-600">{error}</div>}
                {prediction && <div className="mt-4 text-gray-800">{prediction}</div>}
            </div>
        </div>
    );
};

export default Heart;
