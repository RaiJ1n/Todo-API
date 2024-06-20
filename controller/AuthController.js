const User = require("../model/User.Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({
            content: newUser,
            message: "Successsfully register!"
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            content: error
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email }).exec();
        console.log(checkUser)
        if (!checkUser) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        const passwordMatch = await bcrypt.compare(password, checkUser.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        const accessToken = jwt.sign({ email: checkUser.email }, "My_Secret", {
            expiresIn: "3600s",
        });

        res.cookie("jwt", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            token: accessToken,
            content: "Success!!",
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            content: error,
        });
    }
};
exports.changePassword = async (req, res) => {
    try {
        const userid = req.params.id;
        const user = await User.findById(userid).exec();
        
        console.log(req.params.id);

        const newPassword = req.body.password;
        if (!newPassword) {
            return res.status(203).json({
                message: "Password is required"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const changePassword = await User.findByIdAndUpdate(
            userid, {
                password: hashedPassword,
            }, {
                runValidators: true,
                new: true,
            }
        );

        console.log(changePassword);

        if (changePassword) {
            return res.status(200).json({
                status: "Successfully Changed",
                content: changePassword
            });
        }

        return res.status(400).json({
            message: "User not found"
        });
    } catch (err) {
        console.error("Error updating password:", err);
        return res.status(404).json({
            message: "Internal server error"
        });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('jwt',{path:'/'}); 
        res.status(200).json({
            status:"Successfully logout",
            })
            } catch (err) {
                res.status(404).json({
                    status: err.message
                })
            }
}