import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Idea,
  AppUser,
  IdeaStatus,
  Department,
  DEPARTMENTS,
} from "@/types/idea";
import { initializeSeedData } from "@/utils/seedData";

export const MOCK_USERS: AppUser[] = [
  { id: "EMP001", name: "Rajesh Kumar", dept: "Engineering", role: "employee" },
  { id: "EMP002", name: "Sneha Gupta", dept: "Sales", role: "employee" },
  { id: "HOD-ENG", name: "Amit Patel", dept: "Engineering", role: "hod" },
  { id: "HOD-SAL", name: "Priya Sharma", dept: "Sales", role: "hod" },
  { id: "HOD-FIN", name: "Suresh Reddy", dept: "Finance", role: "hod" },
  { id: "HOD-OPS", name: "Meera Nair", dept: "Operations", role: "hod" },
  { id: "HOD-HR", name: "Deepak Joshi", dept: "Human Resources", role: "hod" },
  { id: "HOD-MKT", name: "Anita Singh", dept: "Marketing", role: "hod" },
  {
    id: "HOD-IT",
    name: "Rahul Verma",
    dept: "Information Technology",
    role: "hod",
  },
  { id: "HOD-PRO", name: "Kavita Desai", dept: "Procurement", role: "hod" },
  { id: "MD001", name: "Vikram Singh", dept: "Management", role: "md" },
];

function getDeptKeyFromName(deptName: string): Department | null {
  const entry = Object.entries(DEPARTMENTS).find(([, val]) => val === deptName);
  return entry ? (entry[0] as Department) : null;
}

function generateRefNo(count: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const fy1 = month >= 3 ? year % 100 : (year - 1) % 100;
  const fy2 = fy1 + 1;
  return `${String(fy1).padStart(2, "0")}-${String(fy2).padStart(2, "0")}/${String(count + 1).padStart(4, "0")}`;
}

interface IdeasContextType {
  ideas: Idea[];
  currentUser: AppUser;
  setCurrentUser: (user: AppUser) => void;
  addIdea: (idea: Omit<Idea, "id" | "refNo" | "status">) => void;
  updateIdeaStatus: (
    ideaId: string,
    status: IdeaStatus,
    remarks?: string,
  ) => void;
  getFilteredIdeas: () => Idea[];
  totalIdeasCount: number;
  login: (role: "employee" | "hod" | "md") => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const IdeasContext = createContext<IdeasContextType | null>(null);

export const useIdeas = () => {
  const ctx = useContext(IdeasContext);
  if (!ctx) throw new Error("useIdeas must be used within IdeasProvider");
  return ctx;
};

export const IdeasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize ideas with seed data if localStorage is empty
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    try {
      const saved = localStorage.getItem("cost_saving_ideas");
      if (saved) {
        const parsed = JSON.parse(saved);
        // If localStorage exists but is empty array, seed it
        if (Array.isArray(parsed) && parsed.length === 0) {
          const seededData = initializeSeedData();
          localStorage.setItem("cost_saving_ideas", JSON.stringify(seededData));
          return seededData;
        }
        return parsed;
      }
      // First time - no localStorage, initialize with seed data
      const seededData = initializeSeedData();
      localStorage.setItem("cost_saving_ideas", JSON.stringify(seededData));
      return seededData;
    } catch (error) {
      console.error("Error initializing ideas:", error);
      const seededData = initializeSeedData();
      localStorage.setItem("cost_saving_ideas", JSON.stringify(seededData));
      return seededData;
    }
  });

  // Initialize total count based on ideas length
  const [totalCount, setTotalCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("ideas_total_count");
      if (saved) {
        const parsedCount = parseInt(saved, 10);
        // Ensure count matches ideas array length on init
        return parsedCount;
      }
      // Set count to match seeded ideas length
      const ideasSaved = localStorage.getItem("cost_saving_ideas");
      if (ideasSaved) {
        const parsed = JSON.parse(ideasSaved);
        return Array.isArray(parsed) ? parsed.length : 20;
      }
      return 0;
    } catch (error) {
      console.error("Error initializing count:", error);
      return 0;
    }
  });

  // Authentication state - check localStorage for persisted session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const savedAuth = localStorage.getItem("is_authenticated");
      return savedAuth === "true";
    } catch {
      return false;
    }
  });

  // Initialize current user from localStorage if authenticated
  const [currentUser, setCurrentUser] = useState<AppUser>(() => {
    try {
      const savedUser = localStorage.getItem("current_user");
      if (savedUser && isAuthenticated) {
        return JSON.parse(savedUser);
      }
    } catch {
      // Fallback
    }
    return MOCK_USERS[0]; // Default fallback
  });

  // Persist ideas to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("cost_saving_ideas", JSON.stringify(ideas));
    } catch (error) {
      console.error("Error saving ideas to localStorage:", error);
    }
  }, [ideas]);

  // Persist total count to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("ideas_total_count", String(totalCount));
    } catch (error) {
      console.error("Error saving count to localStorage:", error);
    }
  }, [totalCount]);

  // Persist authentication state
  useEffect(() => {
    try {
      localStorage.setItem("is_authenticated", String(isAuthenticated));
      if (isAuthenticated) {
        localStorage.setItem("current_user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("current_user");
      }
    } catch (error) {
      console.error("Error saving auth state:", error);
    }
  }, [isAuthenticated, currentUser]);

  const login = useCallback((role: "employee" | "hod" | "md") => {
    // Find a user with the specified role
    const user = MOCK_USERS.find((u) => u.role === role);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(MOCK_USERS[0]); // Reset to default
    try {
      localStorage.removeItem("current_user");
      localStorage.setItem("is_authenticated", "false");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, []);

  const addIdea = useCallback(
    (ideaData: Omit<Idea, "id" | "refNo" | "status">) => {
      const newIdea: Idea = {
        ...ideaData,
        id: crypto.randomUUID(),
        refNo: generateRefNo(totalCount),
        status: "pending_hod",
      };
      setIdeas((prev) => [newIdea, ...prev]);
      setTotalCount((prev) => prev + 1);
    },
    [totalCount],
  );

  const updateIdeaStatus = useCallback(
    (ideaId: string, newStatus: IdeaStatus, remarks?: string) => {
      setIdeas((prev) =>
        prev.map((idea) => {
          if (idea.id !== ideaId) return idea;
          const updates: Partial<Idea> = {};

          if (newStatus === "approved") {
            // HOD approved → forward to MD
            updates.status = "pending_md";
            updates.hodApprovedBy = currentUser.name;
            updates.hodApprovedDate = new Date().toISOString();
          } else if (newStatus === "rejected_hod") {
            updates.status = "rejected_hod";
            updates.hodApprovedBy = currentUser.name;
            updates.hodApprovedDate = new Date().toISOString();
            if (remarks) updates.hodRemarks = remarks;
          } else if (newStatus === "in_execution") {
            // MD approved → in execution
            updates.status = "in_execution";
            updates.mdApprovedBy = currentUser.name;
            updates.mdApprovedDate = new Date().toISOString();
          } else if (newStatus === "rejected_md") {
            updates.status = "rejected_md";
            updates.mdApprovedBy = currentUser.name;
            updates.mdApprovedDate = new Date().toISOString();
            if (remarks) updates.mdRemarks = remarks;
          }

          return { ...idea, ...updates };
        }),
      );
    },
    [currentUser],
  );

  const getFilteredIdeas = useCallback(() => {
    // All ideas are visible to everyone
    return ideas;
  }, [ideas]);

  return (
    <IdeasContext.Provider
      value={{
        ideas,
        currentUser,
        setCurrentUser,
        addIdea,
        updateIdeaStatus,
        getFilteredIdeas,
        totalIdeasCount: totalCount,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
};
