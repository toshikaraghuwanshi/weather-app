import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './component/weather';

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
  const getWeather = async () => {

    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat)
    console.log("Longitude is:", long)
    await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=8af8da93c536a6e913fb9ed73ea948d8`)
    .then(res => res.json())
    .then(result => {
      setData(result)
      console.log(result);
    });
  }
    getWeather();
  }, [lat, long]);
  

  return (
    <div className="App">
    {(typeof data.main != 'undefined') ? (
      <Weather weatherData={data}/>
    ): (
      <div>Loading...</div>
    )}
    
  </div>
  );
}

export default App;


