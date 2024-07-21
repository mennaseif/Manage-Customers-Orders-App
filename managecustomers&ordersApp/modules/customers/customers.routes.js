import { Router } from "express"
import { signup, login } from "./customers.controller.js"
import { checkEmailExist } from "../../middleware/checkEmailExist.js"

const customersRouter= Router()

customersRouter.post('/signup', checkEmailExist , signup)
customersRouter.post('/login', login)

export default customersRouter
