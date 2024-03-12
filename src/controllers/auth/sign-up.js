const User = require('../../models/User');
const { maleAvtars, femaleAvtars } = require("../../lib/Avtars");


const registerUser = async (req, res) => {
    try {
        const { name, email, gender, password } = req.body;
        let avtar = '';
        if (gender === 'male') {
            avtar = maleAvtars[Math.floor(Math.random() * maleAvtars.length)];
            console.log(avtar)
        } else {
            avtar = femaleAvtars[Math.floor(Math.random()) * femaleAvtars.length];
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }


        const newUser = new User({
            avtar,
            name,
            email,
            gender,
            password
        });


        await newUser.save();

        res.status(201).json({ message: 'User registered successfully',newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = registerUser

