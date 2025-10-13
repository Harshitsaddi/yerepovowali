const model = require('../model/User.model')

const createOrderService = async(user_id, product_name,amount) =>{
    try{
        const orderData = await User.createOrder(user_id, product_name, amount)
    }catch(err){
        throw err;
    }
}
module.exports = {
    createOrderService
}