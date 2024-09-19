import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stream({ apiUrl, dataKey }) {
  const [streamData, setStreamData] = useState('');

  // Fetch data when the component mounts or input changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(apiUrl);

        if (!response.ok) throw new Error(response.statusText);

        const stream = response.body;

        let currentData = '';

        // Listen to data as it comes in
        const onData = (chunk) => {
          try {
            currentData += new TextDecoder().decode(chunk);
            setStreamData(currentData);
          } catch(e) {
            console.error("Failed to decode chunk:", e);
          }
        };

        stream.on('data', onData);

        // Listen for end of stream
        stream.on('end', () => {
          console.log('Stream ended');
        });

      } catch(error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl, dataKey]); // If `dataKey` changes, fetch again

  return (
    <div>
      {streamData}
    </div>
  );
}
