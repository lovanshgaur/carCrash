const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; 

const imageDir = path.join(__dirname, 'assets');

app.use('/images', express.static(imageDir));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your domain if you want to restrict access
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/random-car', (req, res) => {
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to fetch images.' });
    }

    const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/));

    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    res.json({ imageUrl: `http://localhost:${PORT}/images/${randomImage}` });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
