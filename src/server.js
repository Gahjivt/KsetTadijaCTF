// server.js

const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.get('/generatedKey', (req, res) => {
  fs.readFile('KsetTadijaCTF-main/generatedKey.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading generated key file: ${err}`);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
