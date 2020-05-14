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
				appid: 'f7c4de0476923bb99ff956d686c021ac',
				lang: 'pt',
				units: 'metric'
			}  
		});

		setWeather(res.data);
		console.log(process.env.REACT_APP_OPEN_WHEATHER_KEY); // alterar o appid quando conseguir fazer isto funcionar
	}

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
			getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, []) // Quando este segundo argumento é vazio então executa o efeito somente no load da página

	if (location == false) {
    return (
			<Fragment>
      	Você precisa habilitar a localização no browser
			</Fragment>
		);
	}	else if (weather == false) {
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