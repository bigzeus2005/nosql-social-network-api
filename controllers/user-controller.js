const { Thought, User } = require('../models');

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID ' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err)
      });
  },
  updateUser(req, res) {
    User.updateOne(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: 'No user with this ID' })
          : res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete(
      { _id: req.params.id }
    )
      .then((user) => {
        User.updateMany(
          { _id: { $in: user.friends } },
          { $pull: { friends: req.params.id } }
        )
          .then(() => {
            Thought.deleteMany(
              { username: user.username }
            )
          })
      })
      .then(() => res.json({ message: 'User and thoughts deleted' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.satus(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(() => res.json({ message: 'Friend deleted' }))
      .catch((err) => res.satus(500).json(err));
  },
};