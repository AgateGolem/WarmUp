const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('login', 'Некорректный логин').isLength({ min: 6, max: 15 }).matches(/^[A-Za-z0-9]+$/),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6, max: 15 }).matches(/^[A-Za-z0-9]+$/),
    check('sex', 'Необходимо выбрать пол').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Длина логина и пароля от 6 до 15 символов, латинские символы и цифры'
      })
    }

    const {login, password, sex} = req.body

    const candidate = await User.findOne({ login })

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ login, password: hashedPassword, sex })

    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
    }

    const {login, password} = req.body

    const user = await User.findOne({ login })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'+e })
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user)
    console.log(user)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
