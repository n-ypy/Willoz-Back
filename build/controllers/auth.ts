import { RequestHandler } from "express"
import BadRequestError from "../errors/bad-request.js"
import UnauthenticatedError from "../errors/unauthenticated.js"
import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"


const register : RequestHandler = async (req, res) => {
    const user = await User.create({ ...req.body })

    res
        .status(StatusCodes.CREATED)
        .json({ user: user.name, token: user.createJWT() })
}

const login : RequestHandler = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) throw new BadRequestError('Please provide email and password')

    const user = await User.findOne({ email })

    if (!user) throw new UnauthenticatedError('Invalid Credentials')

    const isPassportCorrect = await user.comparePassword(password)

    if(!isPassportCorrect) throw new UnauthenticatedError('Invalid Credentials')

    const token = user.createJWT()

    res
        .status(StatusCodes.OK)
        .json({ name: user.name, token })
}

export { register, login }