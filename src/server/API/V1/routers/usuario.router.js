import { Router } from 'express'
// import * as errorsController from '../controllers/errors.controller.js'

const router = Router()

router.get('/usuario', (req, res) => res.status(201).send('Pase'))
router.get('/usuario/:id', () => {})
router.post('/usuario', () => {})
router.put('/usuario/:id', () => {})
router.delete('/usuario/:id', () => {})

router.post('/login', () => {})

export default router
