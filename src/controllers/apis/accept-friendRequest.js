const FriendRequest = require('../../models/FriendRequest');
const User = require('../../models/User')

const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.user.userId;

      
        const friendRequest = await FriendRequest.findById(requestId);

    
        if (!friendRequest || friendRequest.recipient.toString() !== userId) {
            return res.status(404).json({ error: 'Friend request not found' });
        }

      
        if (friendRequest.status !== 'pending') {
            return res.status(400).json({ error: 'Friend request has already been processed' });
        }

    
        friendRequest.status = 'accepted';
        await friendRequest.save();


        await User.findByIdAndUpdate(userId, { $push: { friends: friendRequest.sender } });
        await User.findByIdAndUpdate(friendRequest.sender, { $push: { friends: userId } });

        res.status(200).json({ message: 'Friend request accepted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports=acceptFriendRequest;  