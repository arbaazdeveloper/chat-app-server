const mongooseLoader = require('./mongoose');
const cors=require('cors')
module.exports = (app) => {
    mongooseLoader();
    app.use(cors());
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json());

}