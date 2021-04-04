const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Stream = require('../../models/Stream');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/streams
// @desc     Get all streams
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
      const streams = await Stream.find().sort({ date: -1 });
      res.json(streams);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});
  
// @route    GET api/streams/:id
// @desc     Get stream by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
      const stream = await Stream.findById(req.params.id);
  
      if (!stream) {
        return res.status(404).json({ msg: 'Stream not found' });
      }
  
      res.json(stream);
    } catch (err) {
      console.error(err.message);
      
      res.status(500).send('Server Error');
    }
});
  
// @route    POST api/streams
// @desc     Create a stream
// @access   Private
router.post(
    '/',
    auth,
    check('title', 'Title is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
  
        const newStream = new Stream({
          title: req.body.title,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        });
  
        const stream = await newStream.save();
  
        res.json(stream);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);

// @route    DELETE api/streams/:id
// @desc     Delete a stream
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id);

    if (!stream) {
      return res.status(404).json({ msg: 'Stream not found' });
    }

    // Check user
    if (stream.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await stream.remove();

    res.json({ msg: 'Stream removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
