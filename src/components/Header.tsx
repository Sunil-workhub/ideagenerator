import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useIdeas } from "@/context/IdeasContext";
import { Button } from "@/components/ui/button";
import indefLogo from "../assets/images/IndefLogo.png";

const Header = () => {
  const { currentUser, logout } = useIdeas();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getRoleBadge = () => {
    switch (currentUser.role) {
      case "hod":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
            HOD
          </span>
        );
      case "md":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200">
            MD
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-700 border border-sky-200">
            Employee
          </span>
        );
    }
  };

  return (
    <header className="sticky top-0 z-50 h-14 border-b bg-card flex items-center px-4 gap-4 shrink-0 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={indefLogo} alt="Logo" className="h-10 w-8" />
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* User Info Section */}
      <div className="flex items-center gap-3">
        {/* User Details */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-xs font-medium leading-none">
              {currentUser.name}
            </span>
            {/* <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
              {currentUser.dept}
            </span> */}
          </div>
        </div>

        {/* Role Badge */}
        <div className="hidden sm:block">{getRoleBadge()}</div>

        {/* Mobile User Info */}
        <div className="flex sm:hidden items-center gap-2">
          <div className="text-xs font-medium">{currentUser.name}</div>
          {getRoleBadge()}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="h-8 gap-1.5 text-xs hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
        >
          <LogOut className="h-3 w-3" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
