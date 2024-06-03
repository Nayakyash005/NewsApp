import React, { useState } from "react";
import axios from "axios";
// import img1 from "./assets/images.jpeg";
import { useNavigate } from "react-router-dom";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
const News = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countrycode, setcountryCode] = useState("");
  const [check, setcheck] = useState(false);
  const [API, setAPI] = useState("");
  const navigate = useNavigate();

  // const API_URL = "https://newsapi.org/v2/top-headlines";
  const API_URL = "https://news-app-zwfw.vercel.app";
  const API_KEY = "9c1d8b64220947d086caf33245bc037c";

  const handlenews = async () => {
    setIsLoading(true);
    setError(null);

    const url = new URL(`${API_URL}`);
    // url.searchParams.append("country", countrycode);
    // url.searchParams.append("apiKey", API);

    if (countrycode.length > 2) {
      // keep only two letters of it
      const valn = countrycode.slice(0, 2);
      setcountryCode(valn);
    }
    try {
      const response = await fetch(
        `${API_URL}/${countrycode}/9c1d8b64220947d086caf33245bc037c`
      );
      // const response = await fetch(
      //   `https://newsapi.org/v2/top-headlines?country=${countrycode}&apiKey=9c1d8b64220947d086caf33245bc037c`
      // );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setArticles(data.articles);
      setcheck(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAPI = () => {
    console.log("swith to the API key");
    window.location.replace("https://newsapi.org/docs/authentication");
  };

  return (
    <div className="bg-gray-100 min-h-screen bg-no-repeat bg-contain bg-center  bg-gradient-to-r from-blue-100 to-gray-300 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Welcome To My News Application
      </h2>
      <div className="flex justify-center mb-6">
        <label className="flex flex-col items-start mr-4">
          <span className="text-lg  mb-2 font-bold ">Enter country</span>
          <input
            type="text"
            name="country"
            value={countrycode}
            onChange={(e) => setcountryCode(e.target.value.slice(0, 2))}
            id="country"
            placeholder="countryCode..."
            className="h-12 w-64 shadow-xl rounded px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <button
          onClick={handlenews}
          className="px-6 py-2 h-fit md: mt-10 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 shadow-xl"
        >
          Get News
        </button>
      </div>
      {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!check && (
        <div className=" h-screen  w-2/3 justify-center mx-auto px-28 rounded-xl shadow-lg">
          <div className="h-80 w-auto max-w-md bg-blue-100 justify-center mx-auto rounded-xl flex flex-col top-52 relative items-center text-center  px-6 py-8">
            <h1 className="text-3xl">Welcome to my </h1>
            <span className="text-blue-500 text-3xl shadow-lg rounded-md p-3 bg-slate-100">
              News App
            </span>
            <div className="mt-4">
              <p className="text-lg">
                Want To Know what is currently going on in the world, the
                Welcome to our news Application Where you find the latest newa
                of the world
              </p>
            </div>

            <button className="bg-blue-400 mt-8 flex gap-3 w-auto text-xl px-2 py-2 rounded-md shadow-md hover:cursor-pointer hover:scale-110 hover:text-white">
              {" "}
              Get Started
              <IoChatboxEllipsesSharp />
            </button>
          </div>
        </div>
      )}
      {articles.length > 0 && (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h1 className="text-xl font-semibold mb-2">{article.title}</h1>
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 object-contain rounded mb-4"
              />
              <div className="text-gray-600 text-sm mb-4">
                <p>
                  By <strong>{article?.author}</strong> | Published on{" "}
                  <strong>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </strong>
                </p>
              </div>
              <p className="text-gray-800 mb-4">{article.description}</p>
              <div className="content text-gray-700">
                <p>{article.content}</p>
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
