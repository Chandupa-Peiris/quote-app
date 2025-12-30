const express= require('express')
const app = express();
require('dotenv').config();
const dbConnect = require('./config/db');


const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));


dbConnect.connect()
	.then(() => {
		app.listen(HTTP_PORT, () => { console.log(`server is listening on port ${HTTP_PORT}`); });
	})
	.catch((err) => {
		console.error('Failed to connect to DB', err);
		process.exit(1);
	});
