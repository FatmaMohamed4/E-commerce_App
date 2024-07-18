
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'
import generateOTP from 'otp-generator';
import crypto from 'crypto' 
import validator from 'validator';
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "Username is required"],
        },

        email: {
            type: String,
            // required: [true, "Email is required"],
            validate: [validator.isEmail, "This is not a valid Email"],
        } ,

        password :{
            type: String,
            required: [true, "password is required"],
            minlength: [6, "Password must be at least 6 characters"]
        } ,

        phone :{
            type: String,
            match: [/^(010|011|012|015)\d{8}$/, 'Please enter a valid phone number starting with 010, 011, 012, or 015 and 11 digits in total'],

        } ,

        otp: {
        type: String
       },

       otpExpires: {
        type: Date
       } ,

       isAdmin : {
        type :Boolean  ,
        default :false
      }
    },
);

userSchema.pre('save', async function (next) { 
    //only run if password modified
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcryptjs.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcryptjs.compare(candidatePassword, userPassword);
  };

userSchema.generateOtp = async function () {
    // const OTP_LENGTH=4
    const OTP = generateOTP.generate(process.env.OTP_LENGTH || OTP_LENGTH, {
      upperCaseAlphabets: true,
      specialChars: false,
    });
    this.otp = crypto.createHash('sha256').update(OTP).digest('hex');
    this.otpExpires = Date.now() + 10 * 60 * 1000; // valid 10 min
    return OTP;
  };

const User = mongoose.model('User', userSchema);

export default User;