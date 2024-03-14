const router = require('express').Router();
const getFriendById = require('../controllers/apis/get-friend');
const {
    registerUser,
    login, searchUser,
    acceptFriendRequest,
    friendRequest,
    getPendingFriendRequests,
    getAllFriends } = require('../controllers/index');
const authenticate = require('../middlewere/Authenticate');


router.post('/sign-up', registerUser);
router.post('/login', login);
router.post('/search-user', searchUser)
router.post('/friend-request/:recipientId', authenticate, friendRequest);
router.post('/accept-friend-request/:requestId', authenticate, acceptFriendRequest)
router.get('/pending-request', authenticate, getPendingFriendRequests);
router.get('/get-all-friends', authenticate, getAllFriends);
router.get('/get-friend/:id',getFriendById)
module.exports = router