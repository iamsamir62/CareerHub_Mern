import User from "../models/User.model.js"
import asyncHandler from 'express-async-handler'
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { response } from "express";
import { successResponse, failedResponse } from "../utils/apiResponse.js";
const registerUser = async (req, res) => {
  try {
    const { fullname, email, contact, password, role } = req.body;

    if (!fullname || !email || !contact || !password || !role) {
      return res.status(400).json({
        message: "Some fields are missing while registration",
        success: false
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists for the given email!"
      });
    }

    const user = await User.create({
      fullname,
      email,
      contact,
      password,
      role,
    });


    if (user) {
      return res.status(201).json({
        success: true,
        message: 'User created successfully!',
        data: user
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Error while creating the user'
      });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while creating the user'
    });
  }
};


const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Some fields are missing while registration",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist for the given email.",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with the current role.",
        success: false,
      });
    }
    // Compare provided password with stored password
    const isPasswordMatch = await user.comparePassword(password);
    if (isPasswordMatch) {
      const token = await user.generateToken()
      user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        contact: user.contact,
        role: user.role,
        profile: user.profile

      }
      return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json(successResponse('Logged in successfully!', user, { token }));
    } else {
      return res.status(400).json(failedResponse('Invalid credentials!'));
    }

  } catch (error) {
    console.error("Login error: ", error.message);
    res.status(400).json(failedResponse(error.message));
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" }).json({
      message: "Logged out Successfully.",
      success: true
    })

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "An error occurred while logging out.",
      success: false
    });
  }
})

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, contact, bio, skills } = req.body;
    const file = req.file;
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", file);

    let skillsArray;
    if (typeof skills === 'string') {
      skillsArray = skills.split(",");
    } else if (Array.isArray(skills)) {
      skillsArray = skills;
    } else {
      skillsArray = [];
    }

    const userId = req.id;
    console.log("User ID:", userId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullname,
        email,
        contact,
        'profile.bio': bio,
        'profile.skills': skillsArray
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(400).json({
        message: "User not found",
        success: false
      });
    }
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      message: "An error occurred while updating the profile",
      success: false
    });
  }
});




export { registerUser, loginUser, logoutUser, updateProfile }