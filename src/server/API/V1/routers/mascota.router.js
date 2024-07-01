import { Router } from 'express'
// import * as errorsController from '../controllers/errors.controller.js'

const router = Router()

router.get('/mascota', (req, res) => res.status(201).send('Pase'))
router.get('/mascota/:id', () => {})
router.post('/mascota', () => {})
router.put('/mascota/:id', () => {})
router.delete('/mascota/:id', () => {})

export default router
