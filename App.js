import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('your_table_name')
        .select('*');
      if (error) console.error('Error:', error);
      else setData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Supabase</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
