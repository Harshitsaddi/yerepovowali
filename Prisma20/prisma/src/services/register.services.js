const prisma = require('../prisma/client')
const bcrypt = require('bcrypt')

async function createRegister(email,password){
    if(!email || !password){
        const err = new Error('emailand password are required')
        err.status = 400;
        throw err;
    }
    const emailExist = await prisma .register.findUnique({
        where: {email}
    })
    if(emailExist){
        const err = new Error('email already register');
        err.status = 401;
        throw err;
    }
    const salt = 8;
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await prisma.register.create({
        data:{
            email,
            password: hashPassword
        }
    })
}