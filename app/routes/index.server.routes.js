// Load required controllers
const index = require('../controllers/index.server.controller');

// Define the routes module method
module.exports = (app) => {
    app.get('/', index.render);
};
