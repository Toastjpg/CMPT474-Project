const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Node.js API Gateway is up and running! Easy right???');
});

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});