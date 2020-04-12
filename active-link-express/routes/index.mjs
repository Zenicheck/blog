import express from 'express'
import { addReq } from '../helpers/helpers.mjs'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', addReq(req)({ title: 'Accueil' }))
})

/* GET specific service page. */
router.get('/service/:id', (req, res) => {
  res.render('service', addReq(req)({ title: 'Service' }))
})

/* GET service page. */
router.get('/service', (req, res) => {
  res.render('service', addReq(req)({ title: 'Nos services' }))
})

/* GET contact page. */
router.get('/contact', (req, res) => {
  res.render('contact', addReq(req)({ title: 'Nous contacter' }))
})

export default router
