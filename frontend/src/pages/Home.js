import React, { useState } from 'react';
import axios from 'axios';
import BarGraph from '../components/BarGraph';

function Home() {
  const [item, setItem] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/get-calories', { item });
      setData(response.data); // Now an array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Calorie Checker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter food items (e.g., chicken,paneer)"
        />
        <button type="submit">Get Calories</button>
      </form>
      {data && <BarGraph data={data} />}
    </div>
  );
}

export default Home;