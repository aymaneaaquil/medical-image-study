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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});