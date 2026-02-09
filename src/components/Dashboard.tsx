import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdeas } from "@/context/IdeasContext";
import {
  IdeaStatus,
  IDEA_TYPES,
  DEPARTMENTS,
  STATUS_LABELS,
} from "@/types/idea";
import StatusBadge from "./StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  PlusCircle,
  Filter,
  Lightbulb,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { getFilteredIdeas, currentUser } = useIdeas();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<IdeaStatus | "all">("all");

  const ideas = getFilteredIdeas();
  const filtered =
    statusFilter === "all"
      ? ideas
      : ideas.filter((i) => i.status === statusFilter);

  const stats = {
    total: ideas.length,
    pending: ideas.filter(
      (i) => i.status === "pending_hod" || i.status === "pending_md",
    ).length,
    approved: ideas.filter((i) => i.status === "completed").length,
    rejected: ideas.filter(
      (i) => i.status === "rejected_hod" || i.status === "rejected_md",
    ).length,
  };

  const statConfig = [
    {
      label: "Total",
      value: stats.total,
      icon: Lightbulb,
      gradient: "from-sky-500 to-blue-600",
      textColor: "text-sky-700",
      lightBg: "bg-sky-50",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      gradient: "from-amber-500 to-orange-600",
      textColor: "text-amber-700",
      lightBg: "bg-amber-50",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-green-600",
      textColor: "text-emerald-700",
      lightBg: "bg-emerald-50",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      gradient: "from-rose-500 to-red-600",
      textColor: "text-rose-700",
      lightBg: "bg-rose-50",
    },
  ];

  // Helper function to get status color for left border
  const getStatusColor = (status: IdeaStatus) => {
    if (status === "pending_hod" || status === "pending_md") {
      return "border-l-amber-500";
    }
    if (status === "approved" || status === "completed") {
      return "border-l-emerald-500";
    }
    if (status === "rejected_hod" || status === "rejected_md") {
      return "border-l-rose-500";
    }
    return "border-l-gray-300";
  };

  // Helper function to get status background color
  const getStatusBg = (status: IdeaStatus) => {
    if (status === "pending_hod" || status === "pending_md") {
      return "bg-amber-50/50";
    }
    if (status === "approved" || status === "completed") {
      return "bg-emerald-50/50";
    }
    if (status === "rejected_hod" || status === "rejected_md") {
      return "bg-rose-50/50";
    }
    return "bg-card";
  };

  return (
    <div className="flex flex-col h-full space-y-3 animate-fade-in">
      {/* Title and Stats Summary Row - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left: Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Ideas Generator
        </h1>

        {/* Right: Compact Stats Summary - Wraps on mobile */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
          {statConfig.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all group cursor-default`}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}
                ></div>

                {/* Content */}
                <div className="relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white drop-shadow flex-shrink-0" />
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-bold text-white drop-shadow">
                      {stat.value}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/90">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter + New Idea */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 shadow-sm">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <Select
              value={statusFilter}
              onValueChange={(val) =>
                setStatusFilter(val as IdeaStatus | "all")
              }
            >
              <SelectTrigger className="h-7 w-[140px] sm:w-[170px] text-xs border-0 shadow-none">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="all" className="text-xs">
                  All Status
                </SelectItem>
                {Object.entries(STATUS_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k} className="text-xs">
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "idea" : "ideas"}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            size="sm"
            className="h-8 gap-1.5 text-xs shadow-sm w-full sm:w-auto"
            onClick={() => navigate("/submit")}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            New Idea
          </Button>
        </div>
      </div>

      {/* Mobile: card list with colored left border */}
      <div
        className="space-y-3 md:hidden overflow-y-auto px-1"
        style={{ height: "calc(100vh - 330px)" }}
      >
        {filtered.length === 0 ? (
          <div className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground shadow-sm">
            No ideas found.{" "}
            {currentUser.role === "employee" && "Submit your first idea!"}
          </div>
        ) : (
          filtered.map((idea) => (
            <div
              key={idea.id}
              className={`relative overflow-hidden rounded-lg border-l-4 ${getStatusColor(
                idea.status,
              )} border-y border-r bg-card shadow-sm transition-all hover:shadow-md`}
            >
              <div className={`p-3 sm:p-4 ${getStatusBg(idea.status)}`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] sm:text-xs font-semibold text-primary">
                    {idea.refNo}
                  </span>
                  <StatusBadge status={idea.status} />
                </div>

                <div className="space-y-1 text-[10px] sm:text-[11px] text-muted-foreground">
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-foreground truncate">
                      {idea.employeeName}
                    </span>
                    <span className="flex-shrink-0">
                      {new Date(idea.submissionDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        },
                      )}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                    <span className="truncate">
                      {IDEA_TYPES[idea.ideaType]}
                    </span>
                    <span className="text-muted-foreground/70">·</span>
                    <span className="truncate">
                      {DEPARTMENTS[idea.functionTheme]}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/idea/${idea.id}`)}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] sm:text-[11px] font-medium text-primary hover:bg-primary/15 transition-colors"
                  >
                    <Eye className="h-3 w-3" />
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop: Fixed header with scrollable body */}
      <div className="hidden md:flex md:flex-col md:flex-1 md:min-h-0">
        {filtered.length === 0 ? (
          <div className="rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground shadow-sm">
            No ideas found.{" "}
            {currentUser.role === "employee" && "Submit your first idea!"}
          </div>
        ) : (
          <>
            {/* Fixed Header */}
            <div className="sticky top-0 z-10 grid grid-cols-12 gap-3 items-center rounded-lg border bg-gradient-to-r from-muted/80 to-muted/60 backdrop-blur-sm px-4 py-3 shadow-md mb-2">
              <div className="col-span-2 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                Ref No.
              </div>
              <div className="col-span-2 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                Date
              </div>
              <div className="col-span-2 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                Submitted By
              </div>
              <div className="col-span-2 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                Type
              </div>
              <div className="col-span-2 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                Function
              </div>
              <div className="col-span-1 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                Status
              </div>
              <div className="col-span-1 text-[11px] font-semibold uppercase tracking-wider text-foreground text-center">
                Action
              </div>
            </div>

            {/* Scrollable Body */}
            <div
              className="overflow-y-auto space-y-2 pr-1"
              style={{ height: "calc(100vh - 240px)" }}
            >
              {filtered.map((idea) => (
                <div
                  key={idea.id}
                  className={`grid grid-cols-12 gap-3 items-center rounded-lg border-l-4 ${getStatusColor(
                    idea.status,
                  )} border-y border-r shadow-sm transition-all hover:shadow-md ${getStatusBg(
                    idea.status,
                  )} px-4 py-3`}
                >
                  <div className="col-span-2 font-mono text-xs font-semibold text-primary">
                    {idea.refNo}
                  </div>
                  <div className="col-span-2 text-xs text-muted-foreground">
                    {new Date(idea.submissionDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="col-span-2 text-xs font-medium">
                    {idea.employeeName}
                  </div>
                  <div className="col-span-2 text-xs text-muted-foreground">
                    {IDEA_TYPES[idea.ideaType]}
                  </div>
                  <div className="col-span-2 text-xs text-muted-foreground">
                    {DEPARTMENTS[idea.functionTheme]}
                  </div>
                  <div className="col-span-1">
                    <StatusBadge status={idea.status} />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => navigate(`/idea/${idea.id}`)}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Eye className="h-3 w-3" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
