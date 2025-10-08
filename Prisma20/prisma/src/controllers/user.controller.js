const userServices = require("../services/user.service")
async function userCreate(req,res,next){
    try{
        const {name,rollnum,email}= req.body;
        const user = await userServices.userCreate(name,rollnum,email);
        res.status(201).json({success: true, data: user})
    }catch(err){
        next(err)
    }
}
module.exports={
    userCreate
}