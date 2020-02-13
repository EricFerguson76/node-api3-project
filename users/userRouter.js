const express = require('express');

const router = express.Router();

router.use(express.json());

const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const { name } = req.body;
  Users.insert({ name })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error adding user' });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const posts = req.body;
  const { id } = req.params;

  Posts.insert(id, posts)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error adding post' });
    });
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

router.get('/:id', validateUserId, (req, res) => {
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

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;

  Posts.getUserPosts(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({ message: 'Posts not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving the post' });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
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

router.put('/:id', validateUserId, (req, res) => {
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
  const { id } = req.params;

  Users.getById(id)
    .then(id => {
      req.user = id;
      next();
    })
    .catch(() => {
      res.status(400).json({ message: 'invalid user id' });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' });
  }
  if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: 'missimg post data' });
  }
  if (!req.body.text) {
    res.status(400).json({ message: 'missing required string' });
  } else {
    next();
  }
}

module.exports = router;
