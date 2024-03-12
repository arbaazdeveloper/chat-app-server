const User = require('../../models/User'); 

const getAllFriends = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you have user ID in the request (via authentication middleware)

    // Find the user by ID and populate the 'friends' field to get friend details
    const user = await User.findById(userId).populate('friends', 'name email avtar');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports=getAllFriends;