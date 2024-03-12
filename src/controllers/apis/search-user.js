const User = require('../../models/User');


const searchUser = async (req, res) => {
  try {
    const searchChar = req.body.query;

    const users = await User.find({
      $or: [
        { name: { $regex: new RegExp(`^${searchChar}`, 'i') } },
        { email: { $regex: new RegExp(`^${searchChar}`, 'i') } }
      ]
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports =
  searchUser

