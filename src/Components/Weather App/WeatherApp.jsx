import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
 
const WeatherApp = () => {
  const api_key = "be2b275741703ca06fe0b2926150b4d6";
 
  const [wicon, setWicon] = useState(cloud_icon);
  const [background, setBackground] = useState("container1");

 
  const search = async () => {


    const element = document.querySelector(".cityInput"); // Use querySelector for a single element
    if (!element.value) {
      return; // Return early if the input is empty
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`; // Fix the URL
 
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const humidity = document.querySelector(".humidity-percentage"); // Use querySelector for a single element
      const wind = document.querySelector(".wind-rate"); // Use querySelector for a single element
      const temperature = document.querySelector(".weather-temp"); // Use querySelector for a single element
      const location = document.querySelector(".weather-location"); // Use querySelector for a single element
      // const timeOfSearch = document.querySelector(".time-location");
      const countryCode = document.querySelector(".country-code-location");

      
      // var currentTime = new Date();

      // const timeZoneString = "en-" + data.sys.country
      
      // const localTime = currentTime.toLocaleTimeString("en-US",{timeZone: "United States"})

      humidity.innerHTML = data.main.humidity + " %";
      wind.innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature.innerHTML = Math.round(data.main.temp) + "°c";
      location.innerHTML = data.name;
      // timeOfSearch.innerHTML = localTime
      countryCode.innerHTML = "(" + data.sys.country + ")"
    


 
      // Simplify setting the weather icon based on weather condition
      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWicon(clear_icon);
          setBackground("container1");
          break;
        case "02d":
        case "02n":
          setWicon(cloud_icon);
          setBackground("container2");

          break;
        case "03d":
        case "03n":
          setWicon(drizzle_icon);
          setBackground("container3");

          break;
        case "04d":
        case "04n":
          setWicon(drizzle_icon);
          setBackground("container3");

          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
        case "11d":
        case "11n":
          setWicon(rain_icon);
          setBackground("container4");

          break;
        case "13d":
        case "13n":

          setWicon(snow_icon);
          setBackground("container4");

          break;
        default:
          setWicon(clear_icon);
          setBackground("container1");

      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }


  };
 
  return (
    <div className={background}>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon"onClick={search}>
          <img src={search_icon} alt=""  />{" "}
          {/* Simplify the onClick */}
        </div>
      </div>

      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
    <div className="weather-temp">Hi,</div>

      <div className="weather-location">Search a City!</div>
      <div className="country-code-location"></div>
      <div className="time-location"></div>

      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">?%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element wind">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">? km/h</div> {/* Fix the value */}
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default WeatherApp;


