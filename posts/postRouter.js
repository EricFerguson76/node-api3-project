const express = require('express');

const router = express.Router();

router.use(express.json());

const Posts = require('./postDb');

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving the posts' });
    });
});

router.get('/:id', (req, res) => {
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
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
