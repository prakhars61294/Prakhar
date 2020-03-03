const db = require('./db');
var schema = db.Schema({
    f_name: { type: String, required: true, trim: true },
    l_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true }
});

schema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj._id;
    delete obj.__v;
    return obj;
}

// compilation of schema 
module.exports = db.model('user', schema)