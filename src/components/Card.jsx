import React from 'react';
import { Link } from 'react-router-dom';
const Card = ({ imgSrc, heading, text,goto }) => {
  return (
    <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <img className="h-40 object-cover rounded-xl" src={imgSrc} alt={heading} />
      <div className="p-2">
        <h2 className="font-bold text-lg mb-2">{heading}</h2>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
      <div className="m-2">
        <Link to={goto} className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700">
          Go to
        </Link>
      </div>
    </div>
  );
};

export default Card;

