
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';

function App() {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    fetch("/rsvp")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const postData = (route, name, response) => {
    console.log("DATA: ", data);
    const submission = { attendee: name, rsvp: response };
    fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    })
    .then(res => res.json())
    .then(data => {
      console.log ('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  };

  const handleRSVP = (event) => {
    setResponse(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  // const onSubmit = (name) => {
  //   postData("/submit", name);
  //   console.log("submitted!");
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{!data ? "Loading..." : data}</h1>
        <TextField 
          required
          label="Full Name"
          variant="outlined" 
          onChange={handleName}
        />
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        
          <InputLabel>RSVP</InputLabel>
          <Select
            value={response}
            label="Response"
            onChange={handleRSVP}
          >
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
          <Button variant="contained" onClick={() => {postData("/submit", name, response)}}>Submit</Button>
        </FormControl>
      </header>
    </div>
  );
}

export default App;
