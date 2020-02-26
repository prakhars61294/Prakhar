const bodyParser = require('body-parser');
var index = require('./routes/index')
module.exports = function(app) {
    app.use(bodyParser.text())
    app.use('/api', index)
        //invalid url
    app.all('*', function(req, res) {
        res.send("invalid url " + String(req.url));
    });

}