import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { 
  Salary, 
  User, 
  Role, 
  Company,
  Attendance,
  AttendanceStatus,
  LeaveRequest,
  LeaveBalance,
  LeaveStatus
} from "../models/sample.model.js";

// Centralized JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "Sample_Secret_Key_Change_In_Production";

// authrize func helper 
function authorize(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return null;
    }
    return decoded;
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
    return null;
  }
}


// Company account creation
// export async function create_company_account(request, response) {
//   try {
//     const { name, email, phone, address, registrationNumber } = request.body;

//     // Check if company already exists
//     const existingCompany = await Company.findOne({ 
//       $or: [{ email }, { registrationNumber }] 
//     });
    
//     if (existingCompany) {
//       return response.status(400).json({ 
//         success: false, 
//         message: "Company with this email or registration number already exists" 
//       });
//     }

//     // Create company
//     const company = await Company.create({
//       name,
//       email,
//       phone,
//       address,
//       registrationNumber,
//     });

//     return response.status(201).json({
//       success: true,
//       message: "Company registered successfully",
//       data: {
//         id: company._id,
//         name: company.name,
//         email: company.email,
//       },
//     });

//   } catch (error) {
//     console.error("Company Creation Error:", error);
//     return response.status(500).json({ 
//       success: false, 
//       message: "Internal server error" 
//     });
//   }
// }

// User account creation
export async function user_account_Creation(request, response) {
  try {
    const { email, loginId, password, confirmPassword, role, companyName } = request.body;

    // Validate required fields
    if (!email || !loginId || !password || !confirmPassword || !companyName) {
      return response.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Verify password and confirmPassword
    if (password !== confirmPassword) {
      return response.status(400).json({ 
        success: false, 
        message: "Passwords do not match" 
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { loginId }] });
    if (existingUser) {
      return response.status(400).json({ 
        success: false, 
        message: "User with this email or loginId already exists" 
      });
    }

    // Find the company
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return response.status(400).json({ 
        success: false, 
        message: "Company does not exist" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      loginId,
      password: hashedPassword,
      role: role || Role.EMPLOYEE,
      company: company._id,
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role, companyId: company._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

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
    console.error("User Creation Error:", error);
    return response.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

// User sign in
export async function user_signin(request, response) {
  try {
    const { email, password } = request.body;

    // Validate input
    if (!email || !password) {
      return response.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    // Find user
    const user = await User.findOne({ email }).populate("company");
    if (!user) {
      return response.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role, companyId: user.company._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

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
    console.error("Sign In Error:", error);
    return response.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}
