import APIHelper from "../../context/ApiHelper";
import API from "../../constants/API";
import { Download } from "lucide-react";

const IdeaGenDashService = {
  GetIdeaGeneratorPaginated: async (
    pageNumber,
    pageSize,
    employeeId,
    employeeDept,
    ideaType,
    functionTheme,
    hodStatus,
    mdStatus,
    fromDate,
    toDate,
  ) => {
    try {
      const response = await APIHelper(
        "POST",
        API.IdeaGenForm.GetIdeaGeneratorPaginated,
        {
          pageNumber: pageNumber,
          pageSize: pageSize,
          employeeId: employeeId,
          employeeDept: employeeDept,
          ideaType: ideaType,
          functionTheme: functionTheme,
          hodStatus: hodStatus,
          mdStatus: mdStatus,
          fromDate: fromDate,
          toDate: toDate,
        },
      );
      return response;
    } catch (error) {
      console.error("Error fetching idea generator paginated details:", error);
      throw error;
    }
  },
};

export default IdeaGenDashService;
