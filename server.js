import express from 'express';
import bcrypt from 'bcrypt-nodejs';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'Isai',
            email: 'isai@gmail.com',
            // password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Ale',
            email: 'ale@gmail.com',
            // password: 'bananas',
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: '',
            email: '',
            hash: '',
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users);
})

// authenticating user logging in
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    
    // Load hash from your password DB.
    bcrypt.compare("jet", '$2a$10$TKLA8DIwF5G66KazYK4aZ.F9St1QeNjdCc8jZ89r.fD6TxZj3Q5I2', function(err, res) {
        console.log('First', res);
    });
    bcrypt.compare("veggies", '$2a$10$TKLA8DIwF5G66KazYK4aZ.F9St1QeNjdCc8jZ89r.fD6TxZj3Q5I2', function(err, res) {
        console.log('Second', res);
    });
    for (let i = 0; i < database.users.length; i++) {
        if (email === database.users[i].email && 
            password === database.users[i].password) {
                return res.json('Success');
            }       
        }
        return res.status(400).json('Error logging in');
    })

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
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

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            res.json(user);
            found = true;
        }
    })
    if (!found) {
        res.status(404).json('User not found');
    }
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('User not found');
    }
})

app.listen(3000, () => {
    console.log('App is running on PORT 3000')
})