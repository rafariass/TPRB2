import { Router } from 'express'
// import * as errorsController from '../controllers/errors.controller.js'

const router = Router()

router.get('/paseador', (req, res) => res.status(201).send('Pase'))
router.get('/paseador/:id', () => {})
router.post('/paseador', () => {})
router.put('/paseador/:id', () => {})
router.delete('/paseador/:id', () => {})

export default router
