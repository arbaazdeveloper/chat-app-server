const User = require('../../models/User'); // Assuming your User model is in '../models/User'

// Controller function to get a friend by ID
const getFriendById = async (req, res) => {
  try {
    const friendId = req.params.id; 

 
    const friend = await User.findById(friendId,'name avtar');

    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    res.status(200).json({ friend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = 
  getFriendById

