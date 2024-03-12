const registerUser = require('./auth/sign-up');
const login = require('./auth/login')
const searchUser = require('./apis/search-user');
const acceptFriendRequest =require('./apis/accept-friendRequest');
const friendRequest=require('./apis/friend-request');
const getPendingFriendRequests =require('./apis/get-pending-request');
const getAllFriends =require('./apis/get-all-friends')
module.exports = {
    registerUser,
    login,
    searchUser,
    acceptFriendRequest,
    friendRequest,
    getPendingFriendRequests,
    getAllFriends

}