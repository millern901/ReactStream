const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Video = require('../../models/Video');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// video store
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true);
  }
});
let upload = multer({ storage: storage }).single("file");

// @route    POST api/videos/upload
// @desc     Upload a video file
// @access   Private
router.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).send('Server Error');
    }

    res.json({ fileName: res.req.file.filename });
  });
});

// @route    POST api/videos
// @desc     Create a video
// @access   Private
router.post(
  '/',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('fileName', 'File is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      // Create and save the new video
      const newVideo = new Video({
        title: req.body.title,
        description: req.body.description,
        fileName: req.body.fileName,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const video = await newVideo.save();

      // Update the videos in the user profile
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { videos: video } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      res.json(video);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/videos
// @desc     Get all videos
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find().sort({ date: -1 });
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/videos/:id
// @desc     Get video by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    res.json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/video/:id
// @desc     Delete a video
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    // Check user
    if (video.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // add part to remove from multer

    await video.remove();

    res.json({ msg: 'Video removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/videos/like/:id
// @desc     Like a video
// @access   Private
router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    // Check if the post has already been liked
    if (video.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Video already liked' });
    }

    video.likes.unshift({ user: req.user.id });

    await video.save();

    return res.json(video.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/videos/unlike/:id
// @desc     Unlike a video
// @access   Private
router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!video.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Video has not yet been liked' });
    }

    // remove the like
    video.likes = video.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await video.save();

    return res.json(video.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/videos/comment/:id
// @desc     Comment on a video
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const video = await Video.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      video.comments.unshift(newComment);

      await video.save();

      res.json(video.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/videos/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    // Pull out comment
    const comment = video.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    video.comments = video.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await video.save();

    return res.json(video.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
