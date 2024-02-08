import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";


function App() {

  const [country, setcountry] = useState([]);
  const [filterCountry, setfilterCountry] = useState([]);


  // Fetch API for country 
  const fetchApi = async () => {
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/all`);
      console.log("country list =>", res);
      setcountry(res.data);
      setfilterCountry(res.data);
    } catch (e) {
      console.log("Error fetching data: ", e);
    }
  };

  // Perform serach for country
  const handleSearch = (e) => {
    let text = e.target.value;
    setTimeout(() => {
      let arr = country.filter((country) => country.name.common.toLowerCase().match(text.toLowerCase()));
      setfilterCountry(arr);
    }, "1000");
  }




  // Initial rendering
  useEffect(() => {
    fetchApi();
  }, []);


  // Render after searching
  useEffect(() => { }, [filterCountry]);


  return (
    <>
      <div className="searchDiv">
        <input className="search"
          placeholder="Search for countries..."
          onChange={handleSearch}
        />
      </div>
      <div className="card-container">
        {filterCountry.map((country) => (
          <div key={country.cca3} className="countryCard">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="cardImg"
            />
            <h3>{country.name.common}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
