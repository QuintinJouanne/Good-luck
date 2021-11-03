import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import homeImg from '../../assets/home-img.svg';
// import TagList from '../TagList';
import '../../css/Home.css';

const Home = () => {
  const [search, setSearch] = React.useState('');
  const [countryList, setCountryList] = React.useState([]);
  const [displaySearchFilter, setDisplaySearchFilter] = React.useState(false);
  const [countrySearch, setCountrySearch] = React.useState('');
  const [destination, setDestination] = React.useState('/');

  const handleChange = (e) => {
    const currentSearch = e.target.value;
    if (currentSearch.length > 1) {
      const capitalized = currentSearch[0].toUpperCase();
      const stuff = currentSearch.replace(currentSearch[0], capitalized);
      setSearch(stuff);
      setDisplaySearchFilter(true);
    } else if (currentSearch.length === 1) {
      const truc = currentSearch[0].toUpperCase();
      setSearch(truc);
      setDisplaySearchFilter(true);
    } else {
      setSearch('');
      setDisplaySearchFilter(false);
    }
  };

  const handleClick = (e) => {
    setCountrySearch(e.target.innerHTML);
    setSearch(e.target.innerHTML);
    setDestination(`/destination/${e.target.innerHTML}`);
    setDisplaySearchFilter(false);
  };

  useEffect(() => {
    axios
      .get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then((res) => res.data.data)
      .then((data) => setCountryList(data));
    // return () => {
    //   cleanup
    // }
  }, []);

  return (
    <>
      <div className="home-container">
        <h1>Trip@WILDERS</h1>
        <h2>Share the world...</h2>
        <img src={homeImg} alt="home" />
        <label htmlFor="country" id="truc">
          <input
            type="text"
            id="country-input"
            autoComplete="off"
            value={search}
            onChange={handleChange}
          />
          <Link to={destination}>
            <button type="submit" id="search-btn">
              Search
            </button>
          </Link>
        </label>
      </div>
      <div
        className="dropdown"
        style={{ display: displaySearchFilter ? 'block' : 'none' }}
      >
        {countryList
          .filter((country) => country.name.includes(search))
          .map((elem) => (
            <p value={countrySearch} onClick={handleClick}>
              {elem.name}
            </p>
          ))}
      </div>

      {/* <TagList /> */}
    </>
  );
};

export default Home;
