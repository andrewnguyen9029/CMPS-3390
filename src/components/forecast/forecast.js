import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek - 1, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek - 1));

  const groupedData = data.list.reduce((acc, item) => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { items: [], maxTemp: -Infinity, minTemp: Infinity };
    }
    acc[date].items.push(item);
    acc[date].maxTemp = Math.max(acc[date].maxTemp, item.main.temp_max);
    acc[date].minTemp = Math.min(acc[date].minTemp, item.main.temp_min);
    return acc;
  }, {});

  return (
    <>
      <label className="titleDL">Daily Forecast:</label>
      <Accordion allowZeroExpanded>
        {Object.entries(groupedData)
			.slice(0, 5)
			.map(([date, { items, maxTemp, minTemp }], idx) => {
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img src={`icons/${items[0].weather[0].icon}.png`} className="icon-small" alt="weather" />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">{items[0].weather[0].description}</label>
                    <label className="min-max">{Math.round(maxTemp)}°F / {Math.round(minTemp)}°F</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{Math.round(items[0].main.feels_like)}°F</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind Speed:</label>
                    <label>{items[0].wind.speed} mph</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{items[0].main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{items[0].main.pressure} hPa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{items[0].clouds.all}%</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
