import "./current-weather.css";

const CurrentWeather = ({data}) => {
    return (
        <div className="weather">
            <div className="header">
                <div>
                    <p className= "city">{data.city}</p>
                    <p className= "weather-description">{data.weather[0].description} </p>
                </div>
                <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`}/>
            </div>
            <div className="bottom"> 
                <p className= "temperature">{Math.round(data.main.temp)}°F</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-labelDT">Details:</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels Like:</span>
                        <span className="parameter-value"> {Math.round(data.main.feels_like)}°F</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind Speed:</span>
                        <span className="parameter-value"> {data.wind.speed} mph</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity:</span>
                        <span className="parameter-value"> {data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure:</span>
                        <span className="parameter-value"> {data.main.pressure} hPa</span>
                    </div>
                    <div className="parameter-row">
                  		<span className="parameter-label">Clouds:</span>
                  		<span className="parameter-value">{data.clouds.all}%</span>
                	</div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;
