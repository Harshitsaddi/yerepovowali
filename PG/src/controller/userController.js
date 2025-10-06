const userService = require('../services/userService')

const userCreateController = async (req, res) => {

    try {

        const { name, email, password } = req.body;
        if(!name || !email || !password){

            return res.status(400).json({message: "name, email and password are required"})

        }

        const user = await userService.createUser(name, email, password);
        res.status(201).json({
            message: "User created successfully", data : {
                id: user.id,
                name: user.name,
                email: user.email

            }
        });

    } catch (err) {
        res.status(500).json({ 
            message: "Internal server error"
         });
        error.err
    }

}

module.exports = {
    userCreateController
}