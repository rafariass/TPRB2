import bcrypt from 'bcryptjs'

export const bcryptEncrypt = (password) => bcrypt.hashSync(password)

export const bcryptVerify = (password, hash) => bcrypt.compareSync(password, hash)
