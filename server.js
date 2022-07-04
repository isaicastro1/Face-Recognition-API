import express from 'express';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = {
    users: [
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
}

app.listen(3000, () => {
    console.log('App is running on PORT 3000')
})

app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database[0].email && 
        req.body.password === database[0].password) {
            res.json('Success');
        } else {
            res.status(400).json('Error logging in');
        }       
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length -1]);
})

/*

/ --> res = this is working
/signIn --> POST = success/fail
/register --> POST = user (object)
/profile/:userId --> GET = user
/image --> PUT = user

*/