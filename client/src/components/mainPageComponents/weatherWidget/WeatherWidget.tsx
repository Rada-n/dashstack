import React from "react";
import { DashboardData } from "../../../fetch/fetchDashboardData";
import styles from './WeatherWidget.module.css'

const WeatherWidget: React.FC<{ dashboardData: DashboardData }> = ({
  dashboardData,
}) => {
  if (!dashboardData || !dashboardData[4]) {
    return null;
  }

  const weatherData = dashboardData[4];
  const convertKelvinToCelsius = (kelvinDegrees: number): number => {
    return Math.floor(kelvinDegrees - 273.15);
  };

  const convertMetersToKm = (meters: number): number => {
    return Math.floor(meters / 1000)
  }

  return (
    <section className={styles.weatherWidgetSection}>
      <h3 className={styles.title}>Weather</h3>
      <div className={styles.tempContainer}>
        <h4 className={styles.temp}>{convertKelvinToCelsius(weatherData.main.temp)}C°</h4>
        <img
          className={styles.weathericon}
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={`${weatherData.weather[0].main} icon`}
        />
      </div>
      <strong className={styles.weather}>{weatherData.weather[0].main}</strong>
      <span><strong>Visibility:</strong> {convertMetersToKm(weatherData.visibility)} KM</span>
      <span><strong>Wind speed:</strong> {weatherData.wind.speed} m/s</span>
      <span><strong>Clouds:</strong> {weatherData.clouds.all}%</span>

    </section>
  );
};

export default WeatherWidget;
