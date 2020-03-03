const bcrypt = require('bcryptjs')
const conn = require('../bin/config.json');
var db = require('../models/user.models')
var jwt = require('jsonwebtoken')

try {
    exports.register = (req, res) => {

        var content = req.body;

        var dataS = {
            f_name: content.f_name,
            l_name: content.l_name,
            email: content.email
        };
        // Validate if the user are registered than the message are show user registered otherwise create the users
        db.findOne({ email: content.email }, (err, docs) => {
            if (docs) {
                res.json({
                    success: true,
                    message: "User Already Exist"
                })
            } else {
                var obj = new db({
                    f_name: content.f_name,
                    l_name: content.l_name,
                    email: content.email,
                    password: bcrypt.hashSync(content.password, 10),
                })
                obj.save((err, data) => {
                    if (!err) {
                        res.json({
                            sucess: true,
                            message: "User Add Successfully",
                            data: dataS
                        })
                    } else res.json({
                        sucess: false,
                        message: "User Not Added",

                    })
                })
            }

        })
    }
} catch (err) {
    console.log(err);
}

// To Log In

try {
    exports.log_in = (req, res) => {
        jwt.verify(req.headers.authorization, conn[1].key, (err, decoded) => {
            var content = req.body
            console.log(content)
            db.findOne({ email: content.email }, function(err, docs) {
                if (docs === null) {
                    return res.status(403).json({ error: 'No credentials sent!' });
                } else {
                    if (!bcrypt.compareSync(content.password, docs.password)) {
                        return res.status(403).json({ error: 'No credentials sent!' });
                        console.log(!bcrypt.compareSync(content.password, docs.password))
                    } else {
                        res.json({
                            sucess: true,
                            message: "Successfull Login",
                            data: content.email

                        })
                    }
                }
            })
        })

    }
} catch (err) {
    console.log(err);
}

// To Generate Token

try {
    exports.tokeninn = (req, res) => {

        var content = req.body;
        db.findOne({ email: content.email }, (err, data) => {

            if (!data) {
                res.json({
                    sucess: false,
                    message: "Incorrect login"
                })
            } else {
                var token = jwt.sign({
                    id: data._id,
                    firstName: data.f_name,
                    lastName: data.l_name,
                    email: data.email,
                }, conn[1].key, { expiresIn: 600 * 600 });

                res.json({
                    sucess: true,
                    message: "Token Generated successfully",
                    token: token

                })

            }
        })
    }
} catch (err) {
    console.log(err);
}

// Get the user through the id

try {
    exports.get_user = (req, res) => {
        var currentuser = req.headers.authorization;

        jwt.verify(currentuser, conn[1].key, (err, data) => {

            var dataB = {
                f_name: data.firstName,
                l_name: data.lastName,
                email: data.email
            }
            db.findOne({ email: data.email }, function(err, data) {

                if (data === null) {

                    return res.json({
                        sucess: false,
                        message: "User Not Exist",
                        data: [""]
                    })

                } else {
                    return res.json({
                        sucess: true,
                        message: "Users Get Successfully ",
                        data: dataB
                    })
                }
            });
        })
    }
} catch (err) {
    console.log(err);
}

try {
    exports.update_user = (req, res) => {
        var currentuser = req.headers.authorization;
        jwt.verify(currentuser, conn[1].key, (err, data) => {
            var bod = req.body;
            var obj = {
                f_name: bod.f_name,
                l_name: bod.l_name,
                email: bod.email,
                password: bcrypt.hashSync(bod.password, 10)
            }
            db.findOneAndUpdate({ _id: data.id }, obj, (err, data) => {
                if (data) {
                    res.json({
                        success: true,
                        message: "User Updated Succesfully",
                        data: data
                    })

                } else {
                    res.json({
                        success: false,
                        message: "User Not Updated"
                    })
                }
            })

        })
    }
} catch (err) {
    console.log(err);
}

// Delete the user by the user ID

try {
    exports.delete_user = (req, res) => {
        var currentuser = req.headers.authorization;

        jwt.verify(currentuser, conn[1].key, (err, data) => {
            db.deleteOne({ email: data.email }, function(err, doc) {

                if (doc.deletedCount === 0) {

                    res.json({
                        sucess: false,
                        message: "User Not Found",
                        data: doc,
                    })

                } else {
                    res.json({
                        sucess: true,
                        message: "User Deleted successfully",
                        data: [""]
                    })
                }
            })
        })
    }
} catch (err) {
    console.log(err);
}