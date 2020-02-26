const bcrypt = require('bcryptjs')
const conn = require('../config/config.json');
var db = require('../models/user_schema')
var jwt = require('jsonwebtoken')


// Delete the user by the user ID

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


// Update the user to the user Id and upgrade the details 

exports.update_user = (req, res) => {
    var currentuser = req.headers.authorization;

    jwt.verify(currentuser, conn[1].key, (err, data) => {
        var bod = JSON.parse(req.body.toString())
        db.findOneAndUpdate({ db_email: data.email }, bod, { new: true }, function(err, doc) {
            var obj = new db({
                f_name: doc.firstName,
                l_name: doc.lastName,
                email: doc.email,
                password: bcrypt.hashSync(doc.password, 10)
            })
            obj.save((err, data) => {

            })
            var dataB = {
                f_name: data.firstName,
                l_name: data.lastName,
                email: data.email
            }
            if (doc === null) {

                return res.json({
                    sucess: false,
                    message: "User not Exist"
                })

            } else {
                return res.json({
                    sucess: true,
                    message: "User Updated Successfully",
                    data: dataB
                })

            }
        });

    })


}




// Get the user through the id

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