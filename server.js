import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'Isai',
            email: 'isai@gmail.com',
            password: '$2a$10$AgGjjhWRhFfqgiOT4tnxGedMa1oGx55eLfUa5dtNQG46mSv/QyJBa',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Ale',
            email: 'ale@gmail.com',
            password: '$2a$10$.t/ua3SPZtBQMI9vbf8SnOQK6hqwphGlUmxTMIpvUVUPvCveQ98f.',
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
        database.users.map(user => {
            if (user.email === email) {
                user.password === hash;
                bcrypt.compare(password, hash, function(err, res) {
                    if (res === true) {
                        return res.json('Success');
                    }
                })
            } else {
                return res.status(400).json('Error logging in');
            }
        })
    })
})

    // Load hash from your password DB.
    // bcrypt.compare(password, , function(err, res) {
    //     console.log('First', res);
    // });
    
    // for (let i = 0; i < database.users.length; i++) {
    //     if (email === database.users[i].email && 
    //         password === database.users[i].password) {
    //             return res.json('Success');
    //         }       
    //     }
    //     return res.status(400).json('Error logging in');
    // })

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // bcrypt.hash(password, null, null, function(err, hash) {
    //     if (err) {
    //         console.log('Oops, there was an error')
    //     } else {
    //         database.users.push({
    //             id: '125',
    //             name: name,
    //             email: email,
    //             entries: 0,
    //             joined: new Date()
    //         })
    //         res.json(database.users[database.users.length -1]);
    //     }
    // })
    // });

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

app.put('/image', (req, res) => {
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