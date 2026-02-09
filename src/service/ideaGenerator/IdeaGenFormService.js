import APIHelper from "../../context/ApiHelper";
import API from "../../constants/API";
import { Download } from "lucide-react";

const IdeaGenFormService = {
  GetIdeaGenNo: async () => {
    try {
      const response = await APIHelper("POST", API.IdeaGenForm.GetIdeaGenNo);
      return response;
    } catch (error) {
      console.error("Error fetching req number:", error);
      throw error;
    }
  },

  CreateIdeaGenerator: async ({
    employeeId,
    employeeName,
    employeeDept,
    submissionDate,
    ideaType,
    functionTheme,
    description,
    flowchartJson,
  }) => {
    try {
      const response = await APIHelper(
        "POST",
        API.IdeaGenForm.CreateIdeaGenerator,
        {
          employeeId: employeeId,
          employeeName: employeeName,
          employeeDept: employeeDept,
          submissionDate: submissionDate,
          ideaType: ideaType,
          functionTheme: functionTheme,
          description: description,
          flowchartJson: flowchartJson,
        },
      );
      return response;
    } catch (error) {
      console.error("Error creating idea generator:", error);
      throw error;
    }
  },

  ApproveIdeaHOD: async ({ ideaId, status, approvedBy, remarks }) => {
    try {
      const response = await APIHelper("POST", API.IdeaGenForm.ApproveIdeaHOD, {
        ideaId: ideaId,
        status: status,
        approvedBy: approvedBy,
        remarks: remarks,
      });
      return response;
    } catch (error) {
      console.error("Error approving idea HOD:", error);
      throw error;
    }
  },

  ApproveIdeaMD: async ({ ideaId, status, approvedBy, remarks }) => {
    try {
      const response = await APIHelper("POST", API.IdeaGenForm.ApproveIdeaMD, {
        ideaId: ideaId,
        status: status,
        approvedBy: approvedBy,
        remarks: remarks,
      });
      return response;
    } catch (error) {
      console.error("Error approving idea MD:", error);
      throw error;
    }
  },

  GetDeptHODMapping: async (jsonData) => {
    try {
      const response = await APIHelper(
        "POST",
        API.IdeaGenForm.GetDeptHODMapping,
      );
      return response;
    } catch (error) {
      console.error("Error getting dept HOD mapping:", error);
      throw error;
    }
  },

  //response for getDeptHODMapping will be like
  //   {
  //   "status_Code": 200,
  //   "status": "Success",
  //   "message": "Department HOD mapping fetched successfully.",
  //   "data": [
  //     {
  //       "department": "Finance",
  //       "hod": "8292"
  //     },
  //     {
  //       "department": "HR & Admin",
  //       "hod": "9212"
  //     },
  //     {
  //       "department": "IT",
  //       "hod": "8324"
  //     },
  //     {
  //       "department": "Logistics",
  //       "hod": "9204"
  //     },
  //     {
  //       "department": "Marketing",
  //       "hod": "8199"
  //     },
  //     {
  //       "department": "Production",
  //       "hod": "9204"
  //     },
  //     {
  //       "department": "QA",
  //       "hod": "9204"
  //     },
  //     {
  //       "department": "Sales",
  //       "hod": "8177"
  //     },
  //     {
  //       "department": "Stores",
  //       "hod": "9204"
  //     }
  //   ]
  // }

  GetEmployeeDetails: async (empId) => {
    try {
      const response = await APIHelper(
        "POST",
        API.IdeaGenForm.GetEmployeeDetails,
        empId,
      );
      return response;
    } catch (error) {
      console.error("Error getting dept HOD mapping:", error);
      throw error;
    }
  },

  // response for GetEmployeeDetails will be like
  //   {
  //   "status_Code": 200,
  //   "status": "Success",
  //   "message": "Employee details fetched successfully.",
  //   "data": [
  //     {
  //       "emp_name": "Pranay Mahadik",
  //       "designation": "Junior Engineer",
  //       "department": "IT",
  //       "emp_no": "8295",
  //       "emp_email": "mpd@indef.com",
  //       "emp_mobile": "7666045123"
  //     }
  //   ]
  // }
};

export default IdeaGenFormService;
