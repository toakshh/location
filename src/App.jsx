import axios from "axios"
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [countries, setCountries] = useState([]);
  const [countryValue, setCountryValue] = useState("");

  const [states, setStates] = useState([]);
  const [stateValue, setStateValue] = useState("");

  const [cities, setCities] = useState([]);
  const [cityValue, setCityValue] = useState("");


  const handleCountryChange = (e) => {
    setCountryValue(e.target.value);
  }
  const handleStateChange = (e) => {
    setStateValue(e.target.value)
  }
  const handleCityChange = (e) => {
    setCityValue(e.target.value)
  }

  // For countries
  useEffect(() => {
    const countryURL = "https://crio-location-selector.onrender.com/countries";
    try {
      (
        function apiCountryCall() {
          axios.get(countryURL)
            .then(res => {
              // setting all countries data
              setCountries(res.data);
              // reseting state value & data
              setStates([]);
              setStateValue("");
              // reseting city value & data
              setCities([]);
              setCityValue("");
            })
            .catch(failed => <h2>{failed}</h2>)
        }
      )()
    } catch (error) {
      console.log(error)
    }
  }, [])

  //For states
  useEffect(() => {
    const stateURL = `https://crio-location-selector.onrender.com/country=${countryValue}/states`
    if (countryValue) {
      
      try {
        (
          function apiCountryCall() {
            axios.get(stateURL)
              .then(res => {
                // setting all states data
                setStates(res.data);
                // reset cities & data
                setCities([])
                setCityValue("")
              })
              .catch(failed => <h2>{failed}</h2>)
          }
        )()
      } catch (error) {
        console.log(error)
      }
    }
  }, [countryValue])

  //For cities
  useEffect(() => {
    const cityURL = `https://crio-location-selector.onrender.com/country=${countryValue}/state=${stateValue}/cities`

    if(countryValue && stateValue){
      try {
        (
          function apiCountryCall() {
            axios.get(cityURL)
              .then(res => setCities(res.data))
              .catch(failed => <h2>{failed}</h2>)
          }
        )()
      } catch (error) {
        console.log(error)
      }
      }
  }, [countryValue, stateValue])


  return (
    <>
      <h1>Select Location</h1>
      <div>
        {/* countries mapping */}
        <select name="countries" id="countries" onChange={(e) => handleCountryChange(e)}>
          <option value="" >Select Country</option>
          {countries?.map((country, i) => {
            return (<option key={country + i} value={country}>{country}</option>)
          })}
        </select>
        {/* states mapping */}
        <select name="states" id="states" onChange={(e) => handleStateChange(e)} disabled={countryValue ? false : true}>
        <option value="" >Select State</option>        
          {states?.map((state, i) => {
            return (<option key={state + i} value={state}>{state}</option>)
          })}
        </select>
        {/* cities mapping */}
        <select name="cities" id="cities" onChange={(e) => handleCityChange(e)} disabled={stateValue ? false : true}>
        <option value="" >Select City</option>
          {cities?.map((city, i) => {
            return (<option key={city + i} value={city}>{city}</option>)
          })}
        </select>
      </div>
      <div>{
        cityValue &&  
        <p>
        You selected <strong>{cityValue && cityValue}</strong>,<strong>{stateValue && stateValue}</strong> and <strong>{ countryValue && countryValue}</strong></p>
        }
      </div>

    </>
  )
}

export default App
