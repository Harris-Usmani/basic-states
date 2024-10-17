import React, { useState, useEffect } from 'react';

function App() {
  const [verses, setVerses] = useState(null); 
  const [surah, setSurah] = useState(1); 

  useEffect(() => {
    async function fetchVerses() {
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah}`);
        const data = await response.json();
        setVerses(data.data.ayahs.slice(0, 5)); 
      } catch (error) {
        console.error('Error fetching Quran verses:', error);
      }
    }

    fetchVerses();
  }, [surah]);

  return (
    <div>
      <h1>quran through api https examplee</h1>

      <div>
        <label>Select Surah (1-114): </label>
        <input
          type="number"
          min="1"
          max="114"
          value={surah}
          onChange={(e) => setSurah(e.target.value)}
        />
      </div>

      {verses && (
        <div>
          <h2>Fetched Verses from Surah {surah}:</h2>
          {verses.map((verse) => (
            <div key={verse.number}>
              <p>{verse.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
