const bodyParser = require('body-parser');
const configs = require('./configs');
const cors = require('cors');
const routes = require('./routes');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use('/', express.static('public'));
app.use('/api', routes);

app.listen(configs.PORT, () => {
  console.log(`Server is up at port ${configs.PORT}`);
});


