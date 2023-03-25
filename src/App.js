//import logo from './logo.svg';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL } from './api';
import { WEATHER_API_KEY } from './api';
import { useState } from'react';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChnage = (searchData) => {  
    //console.log(searchData);

    //latitude and longitude
    const [lat, lon] = searchData.value.split(" ");
    //                                                    onecall
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    //pass the API being fetched to arrays 
    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forcastResponse = await response[1].json();

      //display the weather data for the city and country 
      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forcastResponse});
    })
    .catch((error) => console.log(error));
  }

console.log(currentWeather);
console.log(forecast);

  return (
    <div className="container">
       <p className="title">Weather Application </p>
      <Search onSearchChange={handleOnSearchChnage}/>
      {currentWeather &&<CurrentWeather data={currentWeather}/>}
      
    </div>
  );
}

export default App;

//