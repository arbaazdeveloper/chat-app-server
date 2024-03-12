const User = require('../../models/User')
const FriendRequest =require('../../models/FriendRequest')
const friendRequest = async (req, res) => {
    try {
        const { recipientId } = req.params;
        const senderId = req.user.userId; 

        const areFriends = await User.exists({
            _id: senderId,
            friends: recipientId
        });

        if (areFriends) {
            return res.status(400).json({ error: 'Users are already friends' });
        }

 
        const existingRequest = await FriendRequest.findOne({
            sender: senderId,
            recipient: recipientId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({ error: 'Friend request already sent' });
        }

        // Create a new friend request
        const friendRequest = new FriendRequest({
            sender: senderId,
            recipient: recipientId
        });

        await friendRequest.save();
        res.status(201).json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports= friendRequest