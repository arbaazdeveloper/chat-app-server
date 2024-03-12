const FriendRequest = require('../../models/FriendRequest');
const User = require('../../models/User');


const getPendingFriendRequests = async (req, res) => {
    try {
        const userId = req.user.userId;


        const pendingRequests = await FriendRequest.find({
            recipient: userId,
            status: 'pending'
        }).populate('sender', 'name email avtar');

        res.status(200).json({ pendingRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = getPendingFriendRequests