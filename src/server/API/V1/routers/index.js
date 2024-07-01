import { Router } from 'express'

import usuarioRouter from './usuario.router.js'
import mascotaRouter from './mascota.router.js'
import paseadorRouter from './paseador.router.js'
import reservaRouter from './reserva.router.js'

const router = Router()

router.use(usuarioRouter)
router.use(mascotaRouter)
router.use(paseadorRouter)
router.use(reservaRouter)

export default router
