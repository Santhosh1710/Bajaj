import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
  
      if (!parsedJson.data || !Array.isArray(parsedJson.data)) {
        throw new Error('Invalid JSON structure. Expected an array under "data".');
      }
      const res = await axios.post('https://bajaj-ausu.onrender.com/bfhl', parsedJson);
  
      setResponse(res.data);
      setError('');
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format. Please check your input.');
      } else if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
      } else {
        setError('An error occurred while processing your request.');
      }
  
      console.error('Error details:', err);
      setResponse(null);
    }
  };
  

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prevOptions) =>
      checked ? [...prevOptions, value] : prevOptions.filter((opt) => opt !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    const { alphabets, numbers, highest_lowercase} = response;
    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{highest_lowercase.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Input</h1>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON e.g. { "data": ["A", "C", "z"] }'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <>
          <div>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest lowercase alphabet"
                onChange={handleOptionChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>
          <div>{renderResponse()}</div>
        </>
      )}
      <footer className="footer">
        Santhosh Kumar S - 21BCI0088 <br />
        santhoshkumar.s2021a@vitstudent.ac.in
      </footer>
    </div>
  );
}

export default App;
