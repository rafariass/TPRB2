import { Router } from 'express'
// import * as errorsController from '../controllers/errors.controller.js'
import * as mascotaController from '../controllers/mascota.controller.js'

const router = Router()

router.get('/mascota', mascotaController.findAll)
router.get('/mascota/:id', () => {})
router.post('/mascota', () => {})
router.put('/mascota/:id', () => {})
router.delete('/mascota/:id', () => {})

export default router
