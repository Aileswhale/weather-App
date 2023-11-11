import  { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [data, setData] = useState({}) 
  const [location, setLocation] = useState(''); 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cce69ccb8da066ae8be856b433c3328a`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
    })
  })

  const searchLocation = (e) => {
    if (e.key === "Enter") {
       axios.get(url).then((response) => {
         setData(response.data);
         console.log(response.data);
       });
    }
   
    
  }
  return (
    <div className="app w-[100%] h-[100vh] relative bg-[#00000066] text-[#fff] ">
      <div className="search text-center p-[1rem]">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Search location..."
          type="text"
          className="py-[0.6rem] px-[1.6rem] text-[1rem] rounded-[25px] outline-none bg-[#ffffff39] "
        />
      </div>

      <div className="container w-[90%] h-[80%] m-auto flex flex-col justify-between ">
        <div className="top w-[100%] my-[1rem] mx-auto ">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
          </div>

          <div className="description  ">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom flex justify-evenly my-[1rem] mx-auto w-[100%] text-center p-[1rem] rounded-[12px] bg-[#ffffff33]">
            <div className="feels">
              <p> Feels Like</p>
              {data.main ? <p>{data.main.feels_like.toFixed()} °F </p> : null}
            </div>

            <div className="humidity">
              <p> Humidity</p>
              {data.main ? <p>{data.main.humidity} %</p> : null}
            </div>

            <div className="wind">
              <p> Wind Speed </p>
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
