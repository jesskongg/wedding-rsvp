const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json()


app.get('/rsvp', (req, res) => {
  res.json({ message: "Hello from the wedding RSVP server!" });
});

app.post('/submit', jsonParser, (req, res) => {
  res.json({ message: "Thank you for your RSVP!" });
  console.log("Message received:", req.body);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});