import React, { useState } from 'react'
import './Weather.css'

const api = {
    key: "569cffb67a9a40ddac1ae92901b5f92c",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const search =(e)=> {
        if(e.key === 'Enter'){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
            
            })
        }    
    }
    const dateBuilder = (d) => {
        let months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        let days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];

        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();
        return `${date} ${date} ${month} ${year}`
    }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp >16)? 'app warm': 'app'): 'app'}>
        <main>
            <div className="search-box">
                <input type="text" 
                className="search-bar" 
                placeholder='search...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}/>
            </div>
            {(typeof weather.main != "undefined")?(
                 <div className="location-box">
                 <div className="location">
                     {weather.name} {weather.sys.country}
                     <div className="date">
                         {dateBuilder(new Date())}
                     </div>
                 </div>
                 <div className="weather-box">
                     <div className="temp">
                         {Math.round(weather.main.temp)}°c
                     </div>
                     <div className="weather">
                        {weather.weather[0].main}
                     </div>
                 </div>
             </div>
            ): (' ')}       
        </main>
    </div>
  )
}

export default Weather