import express from 'express';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = [
    {
        id: '123',
        name: 'Isai',
        email: 'isai@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id: '124',
        name: 'Ale',
        email: 'ale@gmail.com',
        password: 'bananas',
        entries: 0,
        joined: new Date()
    },
]

app.listen(3000, () => {
    console.log('App is running on PORT 3000')
})

app.get('/', (req, res) => {
    res.json('This server is working');
})

app.post('/signin', (req, res) => {
    if (req.body.email === database[0].email && 
        req.body.password === database[0].password) {
            res.json('Success');
        } else {
            res.status(400).json('Error logging in');
        }       
})

/*

/ --> res = this is working
/signIn --> POST = success/fail
/register --> POST = user (object)
/profile/:userId --> GET = user
/image --> PUT = user

*/