const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json({ limit: "50mb" }))

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51H39zhHghzEwbJh6R9XZBnCPcdGDH2A6rdVeUAKQ4gvEfxdXE7nCfdp4wdpbm5NlzEMd5k7XjxmBckn3x6vKPDAj00XYBEYqIe');

//The Masters @ Stripe
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
  });

  res.json({ id: session.id });
});

// const landingPage = require("./endpoints/landing/createEmail")
app.post('/hola', async (req, res) => {
  //check user input for faulty data
  const { email } = req.body
  if(typeof email !== 'string') {
      res.status(500).json({
          error: "invalid input"
      })
      return res
  }
  // check if email already registered? [adapt to mongodb]
  const profExists = await knex.select("id").from("prof").where("email", email).limit(1)
  if(profExists && profExists.length > 0){
      res.json({
          error: "professor already exists"
      })
      return res
  }
  //if all good, insert into db [adapt this to mongodb]
  let insrt
  try {
      insrt = await knex('prof').insert({
          name: name,
          email: email,
          office: office
      }).returning("id")
  }catch(e){
      res.status(500).json({
          error: "bad db connection"
      })
      return res
  }
  res.json({
      insert: insrt
  })
})



const port = 4242;
app.listen(port, () => {
    console.log('chillin` on ' + port); 
});