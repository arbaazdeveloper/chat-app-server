const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        if (user.password !== password) {
            return res.status(401).send({ error: 'Password incorrect' })
        }
        const responseData = {
            userId: user._id,
            name: user.name,
            email: user.email,
            avtar: user.avtar,

        };
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

        return res.status(200).json({ message: 'login succesfull', user: responseData, token });


    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }



}
module.exports = login