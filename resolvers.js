// importo package per le password
const jwt = require('jsonwebtoken');

// funzione per creare il token criptato
const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email },secret, { expiresIn });
}

exports.resolvers = {
    Query: {
        getAllRecipes: async(root, args, { Recipe }) => {
            const allRecipes = await Recipe.find();
            return allRecipes;
        }
    },
    Mutation: {
        addRecipe: async(root, { name, description, category, instructions, username }, { Recipe }) => {
            const newRecipe = await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();
            return newRecipe;
        },
        // creo la nuova mutation che è async, il context è l'User model
        signupUser: async(root, { username, email, password }, { User }) => {
            // recupero utente
            const user = await User.findOne({ username });

            // se trova utente lancio errore
            if (user) {
                throw new Error('User already exists');
            }
            // altrimenti creo nuovo utente
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            // restituisco il token come da query
            // la secret la prendo dall'env
            // scade in 1 ora
            return { token: createToken(newUser, process.env.SECRET, '1hr') };
        }
    }
};