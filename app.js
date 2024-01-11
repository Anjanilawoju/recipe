const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors()); // Enable CORS for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'recipe',
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
    connection.release(); // Release the connection back to the pool
});

// Serving the HTML file for creating a recipe
app.get('/create-recipe', (req, res) => {
    res.send('hi');
});

// Handle POST request to submit a new recipe
app.post('/submit-recipe', (req, res) => {
    console.log('New recipe added to the database');

    const { recipeTitle, ingredients, instructions } = req.body;
    let recipeid=6
    const sql = 'INSERT INTO new_table (recipeid,recipe_title, ingredient) VALUES (?, ?, ?)';
    pool.query(sql, [ recipeid,recipeTitle, ingredients], (err, result) => {
        if (err) {
            console.error('Error adding new recipe: ' + err.stack);
            res.status(500).json({ message: 'Error adding new recipe' });
            return;
        }
        console.log('New recipe added to the database');
        res.status(201).json({ message: 'Recipe added successfully' });
    });
});

// Handle other CRUD operations similarly...
// // Get all recipes
// app.get('/recipes', (req, res) => {
//     const sql = 'SELECT * FROM recipes';
//     pool.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error retrieving recipes: ' + err.stack);
//             res.status(500).json({ message: 'Error retrieving recipes' });
//             return;
//         }
//         res.json(results);
//     });
// });

// // Get one recipe by ID
// app.get('/recipes/:id', (req, res) => {
//     const recipeId = req.params.id;
//     const sql = 'SELECT * FROM Recipes WHERE id = ?';
//     pool.query(sql, [recipeId], (err, results) => {
//         if (err) {
//             console.error('Error retrieving recipe: ' + err.stack);
//             res.status(500).json({ message: 'Error retrieving recipe' });
//             return;
//         }
//         if (results.length === 0) {
//             res.status(404).json({ message: 'Recipe not found' });
//         } else {
//             res.json(results[0]);
//         }
//     });
// });

// // Update a recipe by ID
// app.put('/recipes/:id', (req, res) => {
//     const recipeId = req.params.id;
//     const { recipeTitle, ingredients, instructions } = req.body;

//     const sql = 'UPDATE Recipes SET recipeTitle = ?, ingredients = ?, instructions = ? WHERE id = ?';
//     pool.query(sql, [recipeTitle, ingredients, instructions, recipeId], (err, result) => {
//         if (err) {
//             console.error('Error updating recipe: ' + err.stack);
//             res.status(500).json({ message: 'Error updating recipe' });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: 'Recipe not found' });
//         } else {
//             res.json({ message: 'Recipe updated successfully' });
//         }
//     });
// });

// // Delete a recipe by ID
// app.delete('/recipes/:id', (req, res) => {
//     const recipeId = req.params.id;

//     const sql = 'DELETE FROM Recipes WHERE id = ?';
//     pool.query(sql, [recipeId], (err, result) => {
//         if (err) {
//             console.error('Error deleting recipe: ' + err.stack);
//             res.status(500).json({ message: 'Error deleting recipe' });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: 'Recipe not found' });
//         } else {
//             res.json({ message: 'Recipe deleted successfully' });
//         }
//     });
// });


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
