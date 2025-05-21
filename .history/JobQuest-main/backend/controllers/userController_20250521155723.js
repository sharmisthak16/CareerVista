const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  try {
    let { username, email, password, phone, address, securityAnswer } = req.body;

    username = username?.trim();
    email = email?.trim();
    password = password?.trim();
    phone = phone?.toString().trim();
    address = address?.trim();

    if (!username || !email || !password || !phone || !address || !securityAnswer) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({ error: "Invalid email format" });
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!passwordRegex.test(password)){
        return res.status(400).json({ error: "Password must be at least 8 characters long and include both letters and numbers." });
    }
    const phoneRegex = /^\d{10}$/;
    if(!phoneRegex.test(phone)){
        return res.status(400).json({ error: "Phone number must be exactaly 10 digits." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists. Please choose a different one.",
      });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        error: "Phone number already registered. Please choose a different one"
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const createdUser = new User({
      username,
      email,
      password: hasedPassword,
      phone,
      address,
      securityAnswer
    });

    await createdUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error occurred during registered, please try again laterr",
    });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res
        .status(400)
        .json({ message: "Email and password must be provided" });

    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(401).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });



    res.status(200).send({
      user: existingUser.username,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred, please try again later" });
  }
};

exports.forgotPassword = async (req, res) => {
    try {
        const {email, phone, securityAnswer, newPassword} = req.body;

        if(!email, !phone || !securityAnswer || !newPassword){
            return res.status(400).json({ message: "All fields are required"});
        } 

        const latestPassword = newPassword?.trim();

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!passwordRegex.test(latestPassword)){
            return res.status(400).json({ error: "Password must be at least 8 characters long and include both letters and numbers." });
        }

        const user = await User.findOne({email});
        console.log(user)

        if(!user) return res.status(404).json({error: "User not found"});
        if(user.phone !== phone.toString()) return res.status(404).json({error: "Invalid phone number"});

        if(user.securityAnswer !== securityAnswer){
            return res.status(400).json({ error: "Inncorrect security answer." });
        }

        user.password = await bcrypt.hash(latestPassword, 10);

        await user.save();

        return res.status(200).json({message: "Password updated sucessfully"});


    } catch (error) {
        console.error("Forgit password error",error)
        return res.status(500).json({error:"Server error, please try again later"})
    }
}


exports.logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ error: "Failed to logout" });
  }
};