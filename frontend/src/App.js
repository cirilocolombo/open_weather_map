import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
require('dotenv/config');
 
function App() {
	const [location, setLocation] = useState(false);
	const [weather, setWeather] = useState(false);

	// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY
	let getWeather = async (lat, long) => {
		let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
			params: {
				lat: lat,
				lon: long,
				appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
				lang: 'pt',
				units: 'metric'
			}  
		});

		setWeather(res.data);
	}

	let convertDateWeather = (date) => {
		const unixTimestamp = date
		const milliseconds = unixTimestamp * 1000
		const dateObject = new Date(milliseconds)
		const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15

		return humanDateFormat;
	}

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
			getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, []) // Quando este segundo argumento é vazio então executa o efeito somente no load da página

	if (location === false) {
    return (
			<Fragment>
      	Você precisa habilitar a localização no browser
			</Fragment>
		);
	}	else if (weather === false) {
		return (
			<Fragment>
				Carregando o clima...
			</Fragment>
		)
	} else {
		return (
			<Fragment>
				<h3>Clima em {weather['name']} agora ({weather['weather'][0]['description']})</h3>
				<hr/>
				<ul>
					<li>Data: {convertDateWeather(weather['dt'])}</li>
					<li>Temperatura atual: {weather['main']['temp']}°</li>
					<li>Temperatura máxima: {weather['main']['temp_max']}°</li>
					<li>Temperatura minima: {weather['main']['temp_min']}°</li>
					<li>Pressão: {weather['main']['pressure']} hpa</li>
					<li>Umidade: {weather['main']['humidity']}%</li>
				</ul>
    	</Fragment>
		);
	}
}
 
export default App;