import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data, handleDelete }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 p-2">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h5 className="text-lg font-semibold text-gray-800">{data.name}</h5>
        <h6 className="text-sm text-gray-500">{data.email}</h6>
        <p className="text-gray-700">{data.age}</p>
        <div className="mt-4 flex justify-between">
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(data._id)}
          >
            Delete
          </button>
          <Link
            to={`/${data._id}`}
            className="text-blue-500 hover:underline"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
