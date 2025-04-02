const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3500;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/submit', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'data', 'results.json');

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  let existing = [];
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    existing = content ? JSON.parse(content) : [];
  }

  existing.push(data);

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  res.status(200).json({ message: 'Saved' });
});


app.get('/results', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'results.json');

  if (!fs.existsSync(filePath)) {
    return res.status(200).json({ message: 'No results yet.' });
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const data = content ? JSON.parse(content) : [];

  res.json(data);
});

app.get('/result', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'results.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});