import asyncHandler from 'express-async-handler'
import Company from '../models/company.model.js';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


const registerCompany = asyncHandler(async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "company name is required!",
        success: false
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "you can't register same company",
        success: false
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id
    });
    return res.status(201).json({
      message: "company registered successfully",
      company,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
})

const getAllCompany = asyncHandler(async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (companies.length === 0) {
      return res.status(404).json({
        message: "No companies found for the user.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Companies retrieved successfully!",
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving companies.",
      success: false,
    });
  }
});


const getCompany = asyncHandler(async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "company not found!!",
        success: false
      })
    }
    return res.status(200).json({
      data: company,
      success: true,
    })

  } catch (error) {
    console.log(error);
  }
})

const updateCompany = asyncHandler(async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;


    const updateData = { name, description, website, location, logo }


    const company = await Company.findByIdAndUpdate(
      companyId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company updated successfully!",
      success: true,
      data: company,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      message: "An error occurred while updating the company.",
      success: false,
    });
  }
});





export { registerCompany, getAllCompany, getCompany, updateCompany }