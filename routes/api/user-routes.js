const router = require('express').Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

router.Route('/').get(getAllUsers).post(createUser);

router.Route('/:id').get(getUserByID).put(updateUser).delete(deleteUser);

router.Route('/:id/friends/:friendID').post(addFriend).delete(deleteFriend);

module.exports = router;