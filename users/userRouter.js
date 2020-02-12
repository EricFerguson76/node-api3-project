const express = require('express');

const router = express.Router();

router.use(express.json());

const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving the users' });
    });
});

router.get('/:id', (req, res) => {
  // do your magic!
  const { id } = req.params;

  Users.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: 'User not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving the user' });
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const { id } = req.params;

  Posts.getById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({ message: 'Post not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving the post' });
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const { id } = req.params;

  Users.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The user has been destroyed' });
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch(() => {
      res.status(500).json({ messagge: 'Error removing the user' });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
  const { id } = req.params;
  const usersData = req.body;

  Users.update(id, usersData)
    .then(updatedUser => {
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error updating the user' });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
