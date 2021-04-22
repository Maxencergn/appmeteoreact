/* eslint-disable no-unused-vars */
import './MeteoItem.css';
import logo01d from './icons/01d.png';
import logo01n from './icons/01n.png';
import logo02d from './icons/02d.png';
import logo02n from './icons/02n.png';
import logo03d from './icons/03d.png';
import logo03n from './icons/03n.png';
import React from 'react';
import axios from 'axios';
import Marker from './icons/location-pin.png'
import { useState, useEffect } from 'react';

const api = {
  key: '01698a252afb4707d33caaa8928240ad',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function MeteoItem() {
  // User Location
  /*const [center, setCenter] = useState({});
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            loaded: true,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        function b(error) {
          // eslint-disable-next-line no-console
          console.error(`error ${error.code} ${error.message}`);
        }
      );
    }
  }, []);*/

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((response) => response.data)
      .then((data) => {
        setQuery('');
        setWeather(data);
        console.log(data);
      })
    }
  }

  return (
    <div className='meteoitem'>
      <div className='search-box'>
        <input
          type="city"
          className="search-bar"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
      <div className='meteo-item-card'>
        <div className='first-box'>
          <p className='Temp'>{Math.round(weather.main.temp)}°</p>
          <img className='Logo' src={`icons/${weather.weather[0].icon}.png`}/>
        </div>
        <div className='second-box'>
          <div className='city-box'>
            <img className='Marker' src={Marker} alt='Marker'/>
            <p className='City'>{weather.name}, {weather.sys.country}</p>
          </div>
        </div>
      </div>
      ) : ''}
    </div>
  )
};

export default MeteoItem;