const User = require("../models/user.models");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

const userController = {

    // user Register
    userRegister:async(req,res)=>{
       try{
        console.log(req.body);
        const {firstname,lastname, email, password, phoneN,address} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"});
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:passwordHash,
            phoneN:phoneN,
            address:address
        })
        await newUser.save();
        return res.status(201).json({
            messsage:"user Register Successfully",
            data:newUser
        });
       }catch(err){
           return res.status(500).json({err:err.message});
       }
   },


    // user Login
    login:async(req,res)=>{
        try {
            console.log(req.body);
            const {email,password} = req.body;
            const validate = validator.isEmail(email);
            if (!validate) {
                return res.status(400).json({message:"email format is not valid"})
            }

            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message:"user us not exits"})
            }

            const isMatch = await bcrypt.compare(password,user.password);
            if (!isMatch) {
                return res.status(400).json({message:"password does not match"})
            }

            return res.status(200).json({message:"user successfully login"});

        } catch (error) {
            return res.status(500).json({err:err.message})
        }
    },



    // Get All User
    getAllUser:async(req,res)=>{
        try {
            const user = await User.find();
            console.log(user);
            return res.status(200).json({message:"success",data:user});
            
        } catch (error) {
            return res.status(500).json({err:err.message});
        }

    },



    // user by id
    getUserById:async(req,res)=>{
        try {
            const _id = req.params.id;
            const getUser = await User.findById(_id);
            return res.status(200).json({message:"success",data: getUser})
        } catch (err) {
            return res.status(500).json({err:err.message})
        }

    },



    // Delete User by Id
    deleteUserId:async(req,res)=>{
        try {
            const _id = req.params.id;
            const getUser = await User.findByIdAndDelete(_id);
            return res.status(200).json({message:"deleted success",data:getUser});

        } catch (err) {
            return res.status(500).json({err:err.message})
        }
    },



    // Update user by Id
    // updateUserById:async(req,res)=>{
    //     try {
    //         const _id = req.params.id;
    //         const updateUser = await User.findByIdAndUpdate(_id);
    //         return res.status(200).json({message:"update success", data:updateUser});
    //     } catch (err) {
    //         return res.status(500).json({err:err.message})
    //     }
    // },



    updateUserById : async (req, res) => {
        try {
            const _id = req.params.id;
            const updateData = req.body; // Capture update data from the request body
    
            // Validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return res.status(400).json({ err: "Invalid user ID format" });
            }
    
            // Find the user by ID and update with the provided data
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                updateData,
                { new: true, runValidators: true } // Return the updated document and run validators
            );
    
            if (!updatedUser) {
                return res.status(404).json({ err: "User not found" });
            }
    
            return res.status(200).json({
                message: "Update successful",
                data: updatedUser
            });
        } catch (err) {
            return res.status(500).json({ err: err.message });
        }
    }

}



module.exports = userController;