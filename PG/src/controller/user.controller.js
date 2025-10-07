const userService = require('../services/user.service')

const userCreateController = async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name || email || !password){
            return res.status(400).json({ message: "all field required"})
        }
        const user = await userService.createUser(name, email, password)
        res.status(201).json({
            message: "user created", data:{
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}
module.exports = {
    userCreateController
}