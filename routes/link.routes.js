const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const User = require('../models/User')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', async (req, res) => {
  try {

    const inf = req.body
    const name = inf.name
    const description = inf.description
    const sex = inf.sex
    const link = new Link({
      name, description, sex
    })
    await link.save()

    res.status(201).json({ link })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
    console.log(e)
  }
})
router.post('/setName', async (req, res) => {
  try {

    const inf = req.body
    const name = inf.name
    const secName = inf.secName
    const tok = inf.token

    const user = await User.findOne(tok.userId)
    user.name = name
    user.secName = secName
    await user.save()

    res.status(201).json({ user })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    console.log(e)
  }
})

router.get('/links/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const trains = await Link.find({
  $and: [
    {
      $or: [
        { sex: user.sex },
        { sex: ""}
      ]
    },

  ]
});
    res.json(trains)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})




module.exports = router
