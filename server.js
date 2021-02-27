const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
    // this address is the same as localhost
      host : '127.0.0.1', 
      user : 'postgres',
      password : 'simpson',
      database : 'smartbrain'
    }
  });

// db.select('*').from('users').then(data => {
//     console.log(data);

// });



const app = express(); 

const database = {
    users: [
        {
            id: '123',
            name: 'Robert',
            email: 'robert@yahoo.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Dexter',
            email: 'dexter@yahoo.com',
            password: 'apples',
            entries: 0,
            joined: new Date()
        },
    ],
    // login: [
    //     {
    //         id: '987',
    //         hash: '',
    //         email: 'robert@yahoo.com'
    //     }
    // ]
}

//bodyParser is a middleware- add this after the above app = express() code has been created
app.use(bodyParser.json());
// using as a security fix
app.use(cors());

// simple routes
app.get('/', (req, res) => { res.send(database.users)})
    
// Depedency injection performed 
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})


app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})



// app.listen(3000, () => {
//     console.log('app is running on port 3000');
// })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

