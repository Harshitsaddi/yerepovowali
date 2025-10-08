const userService = require('../services/user.service')

const userCreateController = async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({ message: "all field required"})
        }
        const user = await userService.createUser(name, email, password)
        console.log(
            user
        )
        res.status(201).json({
            message: "user created", data:user
        })
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}
const loginController = async(req, res)=>{
    try{
        const{email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({messgae: 'email and password'})
        }
        const user = await userService.loginUser(email,password)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({message: 'internal server error', error:err});
    }
}
module.exports = {
    userCreateController,
    loginController
}