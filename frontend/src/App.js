import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [location, setLocation] = useState(false);
	const [weather, setWeather] = useState(false);

	// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY
	let getWeather = async (lat, long) => {
		let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
			params: {
				lat: lat,
				lon: long,
				appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
				lang: 'pt',
				units: 'metric'
			}  
		});

		setWeather(res.data);
	}

	let getIconWeather = (name) => {
		const images = require.context('./assets', true);
		
		return images('./' + name + '.png');
	}

	let convertDateWeather = (date) => {
		const unixTimestamp = date
		const milliseconds = unixTimestamp * 1000
		const dateObject = new Date(milliseconds)
		const humanDateFormat = dateObject.toLocaleString()

		return humanDateFormat
	}

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
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
				<div className="card">
					{/*<img src={"http://openweathermap.org/img/wn/" + weather['weather'][0]['icon'] + "@2x.png"} alt=""/>*/}
					<img src={getIconWeather(weather['weather'][0]['icon'])} alt=""/>

					<h3>Clima em <b style={{color: '#364A7A'}}>{weather['name']}</b> agora ({weather['weather'][0]['description']})</h3>

					<ul>
						<li>Data: {convertDateWeather(weather['dt'])}</li>
						<li>Temperatura atual: {weather['main']['temp']}°</li>
						<li>Temperatura máxima: {weather['main']['temp_max']}°</li>
						<li>Temperatura minima: {weather['main']['temp_min']}°</li>
						<li>Pressão: {weather['main']['pressure']} hpa</li>
						<li>Umidade: {weather['main']['humidity']}%</li>
					</ul>
				</div>
    	</Fragment>
		);
	}
}
 
export default App;