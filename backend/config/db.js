const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

mongoose.set('strictQuery', false);

module.exports.connect = function () {
  return mongoose.connect(process.env.connectionString, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected successfully');
  });
};
// const mongoose = require('mongoose');
// require('dotenv').config({ path: '../.env' })



// let User;

// module.exports.connect = function () {
//     return new Promise(function (resolve, reject) {
//         let db = mongoose.createConnection(process.env.connectionString);

//         db.on('error', (err) => {
//             reject(err);
//         });

//         db.once('open', () => {
//             //User = db.model("users", userSchema);
//             resolve();
//             console.log('MongoDB connected successfully');
//         });
//     });
// };


