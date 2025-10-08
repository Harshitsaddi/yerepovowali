const prisma = require('../prisma/client')

async function userCreate(name, rollNum, email){
    console.log("name, rollNum, email",name,rollNum,email)
    if(!name || !rollNum || !email){
        throw new Error("All fields are required");
    }
    const user = await prisma.student.create({
        data:{
            name, 
            rollNum,
            email
        }
    })
    console.log("user",user)

    return user;
}
module.exports = {
    userCreate
}