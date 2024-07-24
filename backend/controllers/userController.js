const userModel = require('../models/userModel');
const bcryptjs = require('bcrypt');


const securePassword = async(password)=>{
    try{
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;    
    }
    catch(error){
        throw error;
    }
}

const registerUser = async (req, res)=>{
    
    try{
        const spassword = await securePassword(req.body.password);
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            image: req.body.image,
            type: req.body.type
        });
        const userData = await userModel.findOne({email: req.body.email});
        if(userData){
            res.status(200).send({success: false, msg: "This email already exists"});
        }
        else{
            const user_Data = await user.save();
            res.status(200).send({success: true, data: user_Data});
        }
    }
    catch(error){
        res.status(400).send(error);
    }
}

module.exports = { registerUser };
