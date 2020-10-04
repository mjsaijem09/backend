const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.register = async (req, res, next) => {
    var newUser = await new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    await newUser.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.loginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    await User.findOne({ email: email, password: password }, (err, result) => {
        if (!err) {
            if (!result) {
                // res.status(428).send(['Account is not yet registtered.']);
                console.log('Account not yet registered');
            }else {
                console.log('Logged in!');
                res.json(result);
            }
        }else {
            return next(err);
        }
    });
}

module.exports.userInfo = async (req, res, next) => {
    const unserInfo = await User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
    res.json(unserInfo);
}