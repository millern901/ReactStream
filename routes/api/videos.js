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

router.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).send('Server Error');
    }

    res.json({ fileName: res.req.file.filename });
  });
});

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

// @route    POST api/videos
// @desc     Create a video
// @access   Private
router.post(
  '/',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('fileName', 'File is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      // Update the videos in the user profile
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { videos: req.body.fileName } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      // Create and save the new video
      const newVideo = new Video({
        title: req.body.title,
        fileName: req.body.fileName,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const video = await newVideo.save();

      res.json(video);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
