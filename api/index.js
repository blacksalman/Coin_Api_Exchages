const express = require('express');
const axios = require('axios');
require('./config');
const Exchanges = require('./exchanges');
const Icons = require('./icons')
const app = express();

app.use(express.json());

app.get('/exchangelist', async (req, resp) => {
  let data = await Exchanges.find();
  resp.send(data)
})

app.post('/exchanges', async (req, resp) => {
  
  const config = {
        method: 'get',
        url: 'https://rest.coinapi.io/v1/exchanges',
        headers: {
          'X-CoinAPI-Key': 'B3795660-80F3-4324-93B6-02D8E5FFFCB6'
        }
      };

      const res = await axios(config);

  Exchanges.deleteMany({}, function(err) { 
    console.log('Exchanges collection removed') 
});
Exchanges.insertMany(res.data).then(function(){
    resp.send("Exchanges Data inserted")  // Success
}).catch(function(error){
  resp.send(error)      // Failure
});
})

app.get('/iconslist', async (req, resp) => {
  let data = await Icons.find();
  resp.send(data)
})

app.post('/icons', async (req, resp) => {

  const config = {
        method: 'get',
        url: 'https://rest.coinapi.io/v1/exchanges/icons/32',
        headers: {
          'X-CoinAPI-Key': 'B3795660-80F3-4324-93B6-02D8E5FFFCB6'
        }
      };

      const res = await axios(config);

      Icons.deleteMany({}, function(err) { 
        console.log('Icons collection removed') 
    });
    Icons.insertMany(res.data).then(function(){
        resp.send("Icons Data inserted")  // Success
    }).catch(function(error){
      resp.send(error)      // Failure
    });
})


app.listen('3001');


