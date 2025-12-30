const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' })



let User;

module.exports.connect = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(process.env.connectionString);

        db.on('error', (err) => {
            reject(err);
        });

        db.once('open', () => {
            //User = db.model("users", userSchema);
            resolve();
            console.log('MongoDB connected successfully');
        });
    });
};


