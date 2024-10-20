const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');
const Tip = require('./models/Tip');
const User = require('./models/User');

const sampleRecipes = require("./sampleData/recipes.json");
const sampleTips = require("./sampleData/tips.json");
const sampleUsers = require("./sampleData/users.json");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

async function populateDB() {
    try {
        const insertedUsers = await User.insertMany(sampleUsers);
        const insertedRecipes = await Recipe.insertMany(sampleRecipes);
        const insertedTips = await Tip.insertMany(sampleTips);
        
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    } finally {
        mongoose.connection.close();
    }
}

populateDB();
