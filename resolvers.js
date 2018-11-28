// importo package per le password
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// funzione per creare il token criptato
const createToken = (user, secret, expiresIn) => {
	const { username, email } = user;
	return jwt.sign({ username, email },secret, { expiresIn });
};

exports.resolvers = {
	Query: {
		getAllRecipes: async(root, args, { Recipe }) => {
			const allRecipes = await Recipe.find().sort({ createdDate: "desc" });
			return allRecipes;
		},
		getRecipe: async(root, { _id }, { Recipe }) => {
			const recipe = await Recipe.findOne({ _id });
			return recipe;
		},
		getCurrentUser: async(root, args, { currentUser, User }) => {
			if (!currentUser) {
				return null;
			}
			const user = await User.findOne({ username: currentUser.username })
				.populate({
					path: "favorites",
					model: "Recipe"

				});
			return user;
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
		signinUser: async(root, { username, password }, { User }) => {
			// check if the user existed
			const user = await User.findOne({ username });
			// if the user doesn't exist trhow an error
			if (!user) {
				throw new Error("User not found");
			}
			// if user exists check if the password match with the username
			const isValidPassword = await bcrypt.compare(password, user.password);

			// if the password isn't correct throw an error
			if (!isValidPassword) {
				throw new Error("Invalid password");
			}
			// restituisco il token come da query
			// la secret la prendo dall'env
			// scade in 1 ora
			return { token: createToken(user, process.env.SECRET, "1hr") };
		},
		// creo la nuova mutation che è async, il context è l'User model
		signupUser: async(root, { username, email, password }, { User }) => {
			// recupero utente
			const user = await User.findOne({ username });

			// se trova utente lancio errore
			if (user) {
				throw new Error("User already exists");
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
			return { token: createToken(newUser, process.env.SECRET, "1hr") };
		}
	}
};