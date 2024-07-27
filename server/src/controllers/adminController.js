import { adminLoginService, adminSignUpService} from "../services/adminServices.js"


export const adminSignupController = async (req, res, next) => {
    try {
        let { name, email, password } = req.body        
        await adminSignUpService(name, email.toLowerCase(), password)
        return res.status(200).json({ msg: 'Success' })
    } catch (error) {
        next(error)
    }
}

export const adminLoginController = async (req, res, next) => {
    try {
        let { userId, password } = req.body

        const result = await adminLoginService(userId, password)

        return res.status(200).json({ msg: 'Success', result })
    } catch (error) {
        next(error)
    }
}