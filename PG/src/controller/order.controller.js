const orderService = require('../services/order.services')
const createOrderController = async (req, res) => {
    try{
        const { user_id, product_name, amount} = req.body;
        if(!user_id || !product_name || !amount){
            return res.status(400).json({error: "all fields are required"})
        }
        const orderData = await orderService.createOrderService(user_id, product_name, amount)
        res.status(401).json({data: orderData, message: 'order created'})
    }catch(err){
        res.status(500).json({err: 'Internal error'})
    }
}
module.exports = {
    createOrderController
}