const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

const API_BASE_URL = 'http://localhost:4000/api/users';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE_URL}/fetch`);
        const users = await response.json();
        res.render('index', { users });
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

app.post('/create', async (req, res) => {
    try {
        await fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const obj={
            name:req.body.name[0],
            email:req.body.name[1],
            age:req.body.name[2]
        }
        await fetch(`${API_BASE_URL}/update/${req.params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

app.post('/delete/:id', async (req, res) => {
    try {
        await fetch(`${API_BASE_URL}/delete/${req.params.id}`, { method: 'DELETE' });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
