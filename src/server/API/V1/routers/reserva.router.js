import { Router } from 'express'
// import * as errorsController from '../controllers/errors.controller.js'

const router = Router()

router.get('/reserva', (req, res) => res.status(201).send('Pase'))
router.get('/reserva/:id', () => {})
router.post('/reserva', () => {})
router.put('/reserva/:id', () => {})
router.delete('/reserva/:id', () => {})

export default router
