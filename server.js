const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 5000 || process.env.PORT
const {
    Client,
    LocalAuth,
    MessageMedia,
  } = require("whatsapp-web.js");
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false },
  });

  client.initialize();

  client.on("qr", (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log("QR RECEIVED", qr);
  });
  
  client.on("authenticated", () => {
    console.log("AUTHENTICATED");
  });
  
  client.on("auth_failure", (msg) => {
    // Fired if session restore was unsuccessful
    console.error("AUTHENTICATION FAILURE", msg);
  });
  
  client.on("ready", () => {
    console.log("READY");
    //so app only listens for request when client is ready to send messages
    app.listen(PORT, () => {
        console.log(`Server started at PORT ----> ${PORT}`)
    })
  });





  //function to send messages
  const messageFuncBulk = async (msg, list) => {
    for (let number of list) {
      number = number + "@c.us";
      client.sendMessage(number, msg);}
      await sleep(500)
  }


  
  app.post('/send-messages', function(req,res){
    
    try{
    const {
        message,
        phoneNumbers,
    } = req.body

    messageFuncBulk(message,phoneNumbers)
    console.log(message,phoneNumbers)

    res.send("request successful");
    }
    catch(err){
        console.log(err)
    }
  
  })







