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

router.get('/:id', validatePostId, (req, res) => {
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

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;

  Posts.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been destroyed' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(() => {
      res.status(500).json({ messagge: 'Error removing the post' });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const postsData = req.body;

  Posts.update(id, postsData)
    .then(updatedPost => {
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error updating the post' });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;

  Posts.getById(id)
    .then(id => {
      req.post = id;
    })
    .catch(() => {
      res.status(404).json({ message: 'Invalid post id' });
    });
  next();
}

module.exports = router;
