// controller for creation of the company , user account and login
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Company, Role, User } from "../models/sample.model.js";

// company account creation
export async function create_company_account(request, response) {

}


// user account creation fuction 
export async function user_account_Creation(request, response) {
  try {
    const { email, loginId, password, confirmPassword, role, companyName } = request.body;

    // Verify password and confirmPassword
    if (password !== confirmPassword) {
      return response.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // check if the user is already exists in the db
    const existingUser = await User.findOne({ $or: [{ email }, { loginId }] });
    if (existingUser) {
      return response.status(400).json({ success: false, message: "User with this email or loginId already exists" });
    }

    // Find the company
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return response.status(400).json({ success: false, message: "Company does not exist" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // user createion
    const user = await User.create({
      email,
      loginId,
      password: hashedPassword,
      role: role || Role.EMPLOYEE,
      company: company._id,
    });

    // jwt
    const token = jwt.sign(
      { userId: user._id, role: user.role, companyId: company._id },
      "Sample Secret",
      { expiresIn: "7d" }
    );

    // final response 
    return response.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        loginId: user.loginId,
        role: user.role,
        company: company.name,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ success: false, message: "Internal server error" });
  }
}


// login
export async function user_signin(request, response) {
  try {
    const { email, password } = request.body;

    // check password
    const user = await User.findOne({ email }).populate("company");
    if (!user) {
      return response.status(404).json({ success: false, message: "User not found" });
    }

    // confirm password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // authorization
    const token = jwt.sign(
      { userId: user._id, role: user.role, companyId: user.company._id },
      "Sample Secret",
      { expiresIn: "7d" }
    );

    // final response
    return response.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        loginId: user.loginId,
        role: user.role,
        company: user.company.name,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ success: false, message: "Internal server error" });
  }
}

