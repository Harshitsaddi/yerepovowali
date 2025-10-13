require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User.model');

<<<<<<< HEAD
const secretKey = process.env.JWT_SECRET
const createUser = async (name, email, password) => {
    try {
        const roundSalt = 8;
        const hashPassword = await bcrypt.hash(password, roundSalt);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            message: 'User registered successfully',
            user,
            token
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createUser
=======
const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (name, email, password) => {
  try {
    // Check if user already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return { message: 'User already exists', user: null, token: null };
    // }

    console.log(name, email, password)
    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await User.create(
      name,
      email,
      hashedPassword,
    );

    console.log(user)
    // Generate JWT token
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return {
      message: 'User registered successfully',
      user,
      token,
    };
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};
const loginUser = async(email,password)=>{
  try{
    const user = await User.findByEmail(email);
    if(!user){
      throw Error('User Not Found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      throw Error('Invalid credentials')
    }
    const payload = {id: user.id, name: user.name, email: user.email }
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'})
    return {
      message:'user-login',
      data:{
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    }
  }catch(err){
    

  }
}

module.exports = {
  createUser,
  loginUser
>>>>>>> 775305a348afed55825d2dcbd5e4773db83ed7c4
};
