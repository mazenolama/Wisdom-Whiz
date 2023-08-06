import React, { useState, useEffect } from 'react';
import './App.css'




const adviceNumber = document.querySelector(".advice-number");
const adviceText = document.querySelector(".quotes");
const apiUrl = "https://api.adviceslip.com/advice";

const getAdvice = () => {
  //Request Data
  fetch(apiUrl, { cache: "no-cache" })
    .then((response) => response.json())
    .then((response) => {
      let data = response.slip;
      let dataId = data.id;
      let dataAdvice = data.advice;
      //Inject to DOM
      adviceNumber.innerHTML = `advice # ${dataId}`;
      adviceText.innerHTML = dataAdvice;
    }).catch(error => console.error(error));
};


function App() {

    const [data, setData] = useState(null);
    const fetchData = async () => {
        try {
          const response = await fetch('https://api.adviceslip.com/advice'); // Replace with your API endpoint
          const jsonData = await response.json();
          setData(jsonData.slip);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
      fetchData(); // Call the API once when the component mounts
    }, []);
  return (
    <>
        <p className="advice-number">Advice # {data ? data.id : null}</p>
        {/* Quote */}
        <q className="quotes">
          {data ? data.advice : null}  
        </q>
        {/* Line Section */}
        <div className="line">
            <div className="line-image"></div>
        </div>
        {/* Dice BTN */}
        <div className="button-section">
            <div className="dice-img" onClick={fetchData}></div>
        </div>
    </>
  )
}

export default App
