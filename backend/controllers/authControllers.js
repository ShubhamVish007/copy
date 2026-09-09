import catchAsyncErrors from '../middlewares/catchAsyncError.js';
import User from '../models/user.js';
import errorHandler from '../utils/errorHandlers.js'

//register => /api/v1/register
export const registerUser = catchAsyncErrors(async(req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.create({ 
        name,
        email, 
        password,
    });

    const token = user.getJwtToken()

    res.status(201).json({
        token,
    });
});


//Login user => /api/v1/login
export const loginUser = catchAsyncErrors(async(req, res, next) => {
    const { email, password} = req.body;

    if(!email || !password) {
     return next(new errorHandler("Please enter email & password", 400))
    }

    //Find user from database
    const user = await User.findOne({ email }).select("+password")

    if(!user) {
     return next(new errorHandler("Invalid email or password", 401))
    }

    //Check if password is correct
    const isPasswordMatched = await user.comparePassword(password)

     if(!isPasswordMatched) {
     return next(new errorHandler("Password doesn't matched", 401))
    }


    const token = user.getJwtToken()

    res.status(200).json({
        token,
    });
});