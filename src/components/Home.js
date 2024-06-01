import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNews = () => {
    navigate("/news");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-400 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-6">Welcome</h1>
        <p className="text-2xl text-gray-700 mb-12">
          Stay updated with the latest news from around the world
        </p>
        <button
          onClick={handleNews}
          className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
        >
          Go to News
        </button>
      </div>
    </div>
  );
};

export default Home;
