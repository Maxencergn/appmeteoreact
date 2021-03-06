/* eslint-disable no-unused-vars */
import './MeteoItem.css';
import logo01d from './icons/01d.png';
import logo01n from './icons/01n.png';
import logo02d from './icons/02d.png';
import logo02n from './icons/02n.png';
import logo03d from './icons/03d.png';
import logo03n from './icons/03n.png';
import logo04d from './icons/04d.png';
import logo04n from './icons/04n.png';
import logo09d from './icons/09d.png';
import logo09n from './icons/09n.png';
import logo10d from './icons/10d.png';
import logo10n from './icons/10n.png';
import logo11d from './icons/11d.png';
import logo11n from './icons/11n.png';
import logo13d from './icons/13d.png';
import logo13n from './icons/13n.png';
import logo50d from './icons/50d.png';
import logo50n from './icons/50n.png';
import React from 'react';
import axios from 'axios';
import Marker from './icons/location-pin.png';
import { useState, useEffect } from 'react';

const api = {
  key: '01698a252afb4707d33caaa8928240ad',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function MeteoItem() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((response) => response.data)
        .then((data) => {
          setQuery('');
          setWeather(data);
          console.log(weather)
        });
    }
  };

  return (
    <div className='meteoitem'>
      <div className='search-box'>
        <input
          type='city'
          className='search-bar'
          placeholder='Search...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {typeof weather.main != 'undefined' ? (
        <div>
          <div className='meteo-item-card'>
            <div className='first-box'>
              <p className='Temp'>{Math.round(weather.main.temp)}°</p>
              <img
                className='Logo'
                src={
                  'http://openweathermap.org/img/w/' +
                  weather.weather[0].icon +
                  '.png'
                }
                alt=''
              />
            </div>
            <div className='second-box'>
              <div className='city-box'>
                <img className='Marker' src={Marker} alt='Marker' />
                <p className='City'>
                  {weather.name.includes('Arrondissement de')
                    ? weather.name.replace('Arrondissement de', '')
                    : weather.name}
                  , {weather.sys.country}
                </p>
              </div>
            </div>
          </div>
          <div className='meteoListItem'>
            <p className='City'>Mardi</p>
            <img
                className='logoList'
                src={
                  'http://openweathermap.org/img/w/' +
                  weather.weather[0].icon +
                  '.png'
                }
                alt=''
              />
              <p className='tempList'>{Math.round(weather.main.temp)}°</p>
          </div>
          <div className='meteoListItem2'>
            <p className='City'>Mercredi</p>
            <img
                className='logoList'
                src={
                  'http://openweathermap.org/img/w/' +
                  weather.weather[0].icon +
                  '.png'
                }
                alt=''
              />
              <p className='tempList'>{Math.round(weather.main.temp)}°</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default MeteoItem;
