const { Router } = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post('/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimum password length is 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect data registration'
      })
    }

    const {email, password} = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });
    await  user.save();
    res.status(201).json({ message: 'User created' });

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again'})
  }
})

// /api/auth/login
router.post('/login',
  [
    [
      check('email', 'Incorrect email').normalizeEmail().isEmail(),
      check('password', 'Enter the password').exists()
    ],
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data log-in'
        })
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password, try again' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })

    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, please try again'})
    }
  })

module.exports = router;