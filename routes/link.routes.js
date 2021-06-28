const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
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

router.get('/', async (req, res) => {
  try {
    const links = await Link.find()
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})




module.exports = router
