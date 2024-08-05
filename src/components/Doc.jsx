import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { SyncLoader } from 'react-spinners';
import axios from 'axios';

const Doc = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleClick = () => {
    setLoading(true);
    axios.post('http://localhost:5000/get_response', { input_text: query })
      .then(res => {
        setResponse(res.data.response);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex mb-5">
        <input
          type="text"
          placeholder='Enter your query'
          value={query}
          onChange={handleChange}
          className="p-5 w-[500px]"
        />
        <button
          className="flex justify-center items-center p-3 bg-blue-500 text-white text-xl ml-3 rounded-xl w-[80px] hover:bg-black hover:text-blue-500"
          onClick={handleClick}
        >
          <FaSearch />
        </button>
      </div>
      <div>
        {loading && <SyncLoader color="#4A90E2" size={10} margin={5} />}
        {response && (
          <div className="mt-5 p-5 bg-gray-200 rounded-lg flex justify-center mx-10">
            {/* <h3 className="text-lg font-bold mb-3">Response:</h3> */}
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Doc;
