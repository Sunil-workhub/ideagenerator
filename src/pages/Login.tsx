import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdeas } from "@/context/IdeasContext";
import { Button } from "@/components/ui/button";
import { User, Shield, Crown } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useIdeas();

  const loginOptions = [
    {
      role: "employee" as const,
      title: "Employee Login",
      description: "Submit and track your cost-saving ideas",
      icon: User,
      gradient: "from-sky-500 to-blue-600",
      hoverGradient: "hover:from-sky-600 hover:to-blue-700",
    },
    {
      role: "hod" as const,
      title: "HOD Login",
      description: "Review, approve or reject ideas from your department",
      icon: Shield,
      gradient: "from-emerald-500 to-green-600",
      hoverGradient: "hover:from-emerald-600 hover:to-green-700",
    },
    {
      role: "md" as const,
      title: "MD Login",
      description: "Final approval and execution assignment",
      icon: Crown,
      gradient: "from-amber-500 to-orange-600",
      hoverGradient: "hover:from-amber-600 hover:to-orange-700",
    },
  ];

  const handleLogin = (role: "employee" | "hod" | "md") => {
    login(role);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Ideas Generator
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Cost Saving Ideas Management System
          </p>
        </div>

        {/* Login Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {loginOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.role}
                onClick={() => handleLogin(option.role)}
                className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group`}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${option.gradient} ${option.hoverGradient} transition-all duration-300`}
                ></div>

                {/* Content */}
                <div className="relative p-6 sm:p-8 flex flex-col items-center text-center min-h-[280px] justify-center">
                  {/* Icon */}
                  <div className="mb-4 p-4 bg-white/20 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-lg" />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-md">
                    {option.title}
                  </h2>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white/90 mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Login Button */}
                  <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-white/90 hover:bg-white rounded-full text-sm font-semibold transition-all duration-300 group-hover:scale-105">
                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Login as {option.role.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Select your role to access the system
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdeas } from "@/context/IdeasContext";
import { Button } from "@/components/ui/button";
import { User, Shield, Crown } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useIdeas();

  const loginOptions = [
    {
      role: "employee" as const,
      title: "Employee Login",
      description: "Submit and track your cost-saving ideas",
      icon: User,
      gradient: "from-sky-500 to-blue-600",
      hoverGradient: "hover:from-sky-600 hover:to-blue-700",
    },
    {
      role: "hod" as const,
      title: "HOD Login",
      description: "Review, approve or reject ideas from your department",
      icon: Shield,
      gradient: "from-emerald-500 to-green-600",
      hoverGradient: "hover:from-emerald-600 hover:to-green-700",
    },
    {
      role: "md" as const,
      title: "MD Login",
      description: "Final approval and execution assignment",
      icon: Crown,
      gradient: "from-amber-500 to-orange-600",
      hoverGradient: "hover:from-amber-600 hover:to-orange-700",
    },
  ];

  const handleLogin = (role: "employee" | "hod" | "md") => {
    login(role);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Ideas Generator
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Cost Saving Ideas Management System
          </p>
        </div>

        {/* Login Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {loginOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.role}
                onClick={() => handleLogin(option.role)}
                className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group`}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${option.gradient} ${option.hoverGradient} transition-all duration-300`}
                ></div>

                {/* Content */}
                <div className="relative p-6 sm:p-8 flex flex-col items-center text-center min-h-[280px] justify-center">
                  {/* Icon */}
                  <div className="mb-4 p-4 bg-white/20 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-lg" />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-md">
                    {option.title}
                  </h2>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white/90 mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Login Button */}
                  <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-white/90 hover:bg-white rounded-full text-sm font-semibold transition-all duration-300 group-hover:scale-105">
                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Login as {option.role.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Select your role to access the system
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
