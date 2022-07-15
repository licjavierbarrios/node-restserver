const mongoose = require("mongoose");
const USER = process.env.USER_MONGODB;
const PASS = process.env.PASS_MONGODB;
const NAMEDB = process.env.NOMBRE_DB;
const URL = `mongodb+srv://${USER}:${PASS}@cluster0.ibihioa.mongodb.net/${NAMEDB}`;
const dbConnection = async () => {
	try {
		await mongoose.connect(URL);

		console.log("Base de datos online");
	} catch (error) {
		console.log(error);
		console.log(URL);
		throw new Error("Error al iniciar la Base de Datos");
	}
};

module.exports = {
	dbConnection,
};
