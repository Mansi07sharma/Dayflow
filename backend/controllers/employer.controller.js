import { User, Attendance, LeaveRequest } from "./models.js"; // adjust path to your models




export async function GetAllEmployess(req , res) {
  try{
    //to fetch employees with their status of attendance

    const employees = await User.find({ role: "EMPLOYEE" })
      .select("-password")
      .populate("company", "name logoUrl")
      .populate({
        path: "attendanceStatus",
        select: "status date",
      });

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });  
  }
}



export async function EditEmployeeProfile(req , res) {
  try{
   // it takes the employee edited data which is given and then edit that part of employee data 
    const {email , firstName , lastName , phone ,  department , location , panNo , accountNumber , ifscCode , uanNo , dateOfBirth , nationality , martialstatus } = req.body;


    const updateUser = await User.find({email : email});
    if(!updateUser){
      return res.json({
        success : false,
        message : "User not found"
      })
    }

    updateUser.firstName = firstName? firstName : updateUser.firstName ;
    updateUser.lastName = lastName? lastName : updateUser.lastName ;
    updateUser.phone = phone? phone : updateUser.phone ;
    updateUser.department = department ? department : updateUser.department;
    updateUser.location = location ? location : updateUser.location ;
    updateUser.panNo = panNo ? panNo : updateUser.panNo ;
    updateUser.accountNumber = accountNumber ? accountNumber : updateUser.accountNumber ;
    updateUser.ifscCode = ifscCode ? ifscCode : updateUser.ifscCode ;
    updateUser.uanNo = uanNo ? uanNo : updateUser.uanNo ;
    updateUser.dateOfBirth = dateOfBirth ? dateOfBirth : updateUser.dateOfBirth ;
    updateUser.nationality = nationality ? nationality : updateUser.nationality ;
    updateUser.martialstatus = martialstatus ? martialstatus : updateUser.martialstatus ;
    
    await updateUser.save();

  }
  catch(error){
   return res.status(500).json({
      success: false,
      message: "Internal server error"
   })
  }
  
}






export async function GetEmployeeProfile(req , res) { 
  try{
    // to get the employee profile data when employer wants to see it
    const { email } = req.params;
    
    const user = await User.findOne({ email: email })
      .select("-password")
      .populate("company", "name logoUrl");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}


export async function GetEmployeeAttendance(req , res) {
  try{
    // to get the attendance of a particular employee when employer wants to see it
    const { email } = req.params;
    
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const attendanceRecords = await Attendance.find({ user: user._id })
      .sort({ date: -1 })
      .select("date checkIn checkOut status workHours extraHours");

    return res.status(200).json({
      success: true,
      attendanceRecords,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// export async function GetEmployeeSalary(req  , res) {
//   try{

//   }
//   catch(error){
    
//   }
  
// }


export async function GetEmployeeAttendance(req , res){
  try{
    const { email } = req.params;
    
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const attendanceRecords = await Attendance.find({ user: user._id })
      .sort({ date: -1 })
      .select("date checkIn checkOut status workHours extraHours");

    return res.status(200).json({
      success: true,
      attendanceRecords,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}



