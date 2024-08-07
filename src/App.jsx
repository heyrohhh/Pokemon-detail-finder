import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pokemonName, setPokemonName] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleFetchClick = () => {
    fetchData();
  };

  return (
    <div className='container'>

      <div className='section1'>
      <h1 style={{textAlign:'center', color:'Red', fontFamily:'serif'}}>Pokemon Detail Finder</h1>

<div className='inputSection'>
<input
  type="text"
  value={pokemonName}
  onChange={handleInputChange}
  placeholder="Enter Pokemon name"

  style={{width:'80%', height:'4vh', fontSize:'medium', borderRadius:'4px'}}
/>
<button onClick={handleFetchClick}  style={{backgroundColor:'rgb(191, 252, 231)', borderRadius:'4px', marginLeft:'1%', width:'25%'}}>Find Detail</button>
</div>


{loading && <div>Loading...</div>}
{error && <div>Error: {error.message}</div>}
{data && (
  <div>
    <h2 style={{textAlign:'center', color:'ActiveCaption', fontFamily:'revert'}}>Detail of {data.name.toUpperCase()}</h2>
    <ul>
       <p  style={{width:'90%',border:'1px solid red', textAlign:'center', color:'red'}}>Basic Details</p>
      <li style={{listStyle:'circle'}}><strong>Name:</strong> {data.name}</li>
      <li style={{listStyle:'circle'}}><strong>Height:</strong> {data.height}</li>
      <li style={{listStyle:'circle'}}><strong>Weight:</strong> {data.weight}</li>
      <li style={{listStyle:'circle'}}><strong>Base Experience:</strong> {data.base_experience}</li>
      <li style={{listStyle:'none'}}>
        <p style={{width:'90%',border:'1px solid red', textAlign:'center', color:'red'}}>Abilities</p>
        <ul>
          {data.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </li>
      <li style={{listStyle:'none'}}>
       <p style={{width:'90%',border:'1px solid red', textAlign:'center', color:'red'}}>Stats:</p>
        <ul>
          {data.stats.map((stat, index) => (
            <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
          ))}
        </ul>
      </li>
      <li style={{listStyle:'none'}}>
        <p  style={{width:'90%',border:'1px solid red', textAlign:'center', color:'red'}}>Held Items:</p>
        <ul>
          {data.held_items.map((heldItems, index) => (
            <li key={index}>{heldItems.item.name}</li>
          ))}
        </ul>
      </li>
     
      <li style={{listStyle:'none'}}>
        <p  style={{width:'90%',border:'1px solid red', textAlign:'center', color:'red'}}>Sprites:</p>
        <div>
          <img src={data.sprites.front_default} alt={`${data.name} front`} style={{height:"6rem"}} />
          <img src={data.sprites.back_default} alt={`${data.name} back`} />
          <img src={data.sprites.front_shiny} alt={`${data.name} shiny front`} />
          <img src={data.sprites.back_shiny} alt={`${data.name} shiny back`} />
        </div>
      </li>
    </ul>  
  </div>
)}
      </div>
      <div className='section2'>
     <img src='https://c4.wallpaperflare.com/wallpaper/401/563/762/pikachu-pokemon-trainers-pokemon-go-pokemon-wallpaper-preview.jpg'
    
    style={{height:'53rem'}}
     ></img>
      </div>
      
    </div>
  );
};

export default DataFetchingComponent;
