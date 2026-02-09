import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIdeas } from "@/context/IdeasContext";
import { IDEA_TYPES, DEPARTMENTS } from "@/types/idea";
import StatusBadge from "./StatusBadge";
import RichTextEditor from "./RichTextEditor";
import FlowchartEditor from "./FlowchartEditor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, X, Clock, User } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import reviewDoodle from "../assets/images/review-doodle.png";

const IdeaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { ideas, currentUser, updateIdeaStatus } = useIdeas();
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  const idea = ideas.find((i) => i.id === id);
  if (!idea) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Idea not found.{" "}
        <button
          onClick={() => navigate("/")}
          className="text-primary underline"
        >
          Go back
        </button>
      </div>
    );
  }

  // ANY HOD can approve HOD-level ideas (no department restriction)
  const canHODApprove =
    currentUser.role === "hod" && idea.status === "pending_hod";

  // Only MD can approve MD-level ideas
  const canMDApprove =
    currentUser.role === "md" && idea.status === "pending_md";

  const confirmApprove = () => {
    if (canHODApprove) {
      updateIdeaStatus(idea.id, "approved", remarks);
      toast.success("Idea approved with remarks and forwarded to MD");
    } else if (canMDApprove) {
      updateIdeaStatus(idea.id, "completed", remarks);
      toast.success("Idea approved with remarks and marked as completed");
    }
    setShowApproveConfirm(false);
    setRemarks("");
    setShowApproveForm(false);
  };

  const confirmReject = () => {
    if (!remarks.trim()) {
      toast.error("Please provide rejection remarks");
      return;
    }
    if (canHODApprove) {
      updateIdeaStatus(idea.id, "rejected_hod", remarks);
      toast.success("Idea rejected by HOD");
    } else if (canMDApprove) {
      updateIdeaStatus(idea.id, "rejected_md", remarks);
      toast.success("Idea rejected by MD");
    }
    setShowRejectConfirm(false);
    setShowRejectForm(false);
    setRemarks("");
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Side - Detail Content */}
          <div className="lg:col-span-2 space-y-3 animate-fade-in">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> Back to Dashboard
            </button>

            <div className="bg-card rounded-xl border shadow-lg">
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/5 to-purple-500/5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-primary">
                    {idea.refNo}
                  </span>
                  <StatusBadge status={idea.status} />
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Submitted{" "}
                  {new Date(idea.submissionDate).toLocaleDateString("en-IN")}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 border-b bg-muted/10">
                {[
                  {
                    label: "Employee",
                    value: `${idea.employeeName} (${idea.employeeId})`,
                  },
                  { label: "Department", value: idea.employeeDept },
                  { label: "Idea Type", value: IDEA_TYPES[idea.ideaType] },
                  {
                    label: "Function / Theme",
                    value: DEPARTMENTS[idea.functionTheme],
                  },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                      {f.label}
                    </label>
                    <div className="text-xs font-medium mt-0.5">{f.value}</div>
                  </div>
                ))}
              </div>

              {idea.description && (
                <div className="p-4 border-b">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2 block">
                    Description
                  </label>
                  <RichTextEditor value={idea.description} readOnly />
                </div>
              )}

              {idea.flowchart && idea.flowchart.nodes.length > 0 && (
                <div className="p-4 border-b">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2 block">
                    Flowchart
                  </label>
                  <FlowchartEditor value={idea.flowchart} readOnly />
                </div>
              )}

              <div className="p-4 border-b">
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2 block">
                  Approval Trail
                </label>
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded border ${
                      idea.hodApprovedBy
                        ? idea.status === "rejected_hod"
                          ? "status-rejected"
                          : "status-approved"
                        : idea.status === "pending_hod"
                          ? "status-pending"
                          : "border-muted bg-muted/30"
                    }`}
                  >
                    <User className="h-3 w-3" />
                    <span>HOD</span>
                    {idea.hodApprovedBy && (
                      <span className="text-[10px] opacity-70">
                        ({idea.hodApprovedBy})
                      </span>
                    )}
                  </div>
                  <div className="h-px w-6 bg-border" />
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded border ${
                      idea.mdApprovedBy
                        ? idea.status === "rejected_md"
                          ? "status-rejected"
                          : "status-approved"
                        : idea.status === "pending_md"
                          ? "status-pending"
                          : "border-muted bg-muted/30"
                    }`}
                  >
                    <User className="h-3 w-3" />
                    <span>MD</span>
                    {idea.mdApprovedBy && (
                      <span className="text-[10px] opacity-70">
                        ({idea.mdApprovedBy})
                      </span>
                    )}
                  </div>
                  {idea.status === "completed" && (
                    <>
                      <div className="h-px w-6 bg-border" />
                      <div className="flex items-center gap-1 px-2 py-1 rounded border status-completed">
                        <Clock className="h-3 w-3" />
                        <span>
                          Completed: {DEPARTMENTS[idea.functionTheme]}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {idea.hodRemarks && (
                  <div className="mt-2 p-2 rounded bg-primary/10 border border-primary/20 text-xs">
                    <span className="font-medium text-primary">
                      HOD Remarks:
                    </span>{" "}
                    {idea.hodRemarks}
                  </div>
                )}
                {idea.mdRemarks && (
                  <div className="mt-2 p-2 rounded bg-emerald-50 border border-emerald-200 text-xs">
                    <span className="font-medium text-emerald-700">
                      MD Remarks:
                    </span>{" "}
                    {idea.mdRemarks}
                  </div>
                )}
              </div>

              {/* Action Section */}
              {(canHODApprove || canMDApprove) && (
                <div className="p-4">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2 block">
                    {canHODApprove ? "HOD Action" : "MD Action"}
                  </label>

                  {showRejectForm ? (
                    <div className="space-y-2">
                      <Textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Enter rejection remarks (required)..."
                        className="text-xs min-h-[80px]"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="text-xs h-8 flex-1"
                          onClick={() => setShowRejectConfirm(true)}
                        >
                          <X className="h-3 w-3" /> Confirm Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8"
                          onClick={() => {
                            setShowRejectForm(false);
                            setRemarks("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : showApproveForm ? (
                    <div className="space-y-2">
                      <Textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Enter approval remarks (optional but recommended)..."
                        className="text-xs min-h-[80px]"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="text-xs h-8 gap-1 flex-1"
                          onClick={() => setShowApproveConfirm(true)}
                        >
                          <Check className="h-3 w-3" /> Confirm Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8"
                          onClick={() => {
                            setShowApproveForm(false);
                            setRemarks("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="text-xs h-8 gap-1 flex-1 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700 hover:text-emerald-800"
                        onClick={() => setShowApproveForm(true)}
                      >
                        <Check className="h-3 w-3" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-xs h-8 gap-1 flex-1"
                        onClick={() => setShowRejectForm(true)}
                      >
                        <X className="h-3 w-3" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Sticky Doodle Image */}
          <div className="hidden lg:block">
            <div className="sticky top-20 animate-fade-in">
              <div className="relative w-full max-w-sm mx-auto">
                <img
                  src={reviewDoodle}
                  alt="Excited person reviewing ideas"
                  className="w-full h-auto drop-shadow-2xl rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Confirmation Dialog */}
      <AlertDialog
        open={showApproveConfirm}
        onOpenChange={setShowApproveConfirm}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Approval</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve idea{" "}
              <span className="font-mono font-bold">{idea.refNo}</span>?
              {canHODApprove &&
                " This will forward the idea to MD for final approval."}
              {canMDApprove && " This will mark the idea as completed."}
              {remarks && (
                <div className="mt-2 p-2 bg-emerald-50 border rounded text-xs">
                  Remarks: {remarks}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs h-8">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="text-xs h-8" onClick={confirmApprove}>
              Yes, Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectConfirm} onOpenChange={setShowRejectConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Rejection</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject idea{" "}
              <span className="font-mono font-bold">{idea.refNo}</span>? This
              action cannot be undone.
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-xs">
                Remarks: {remarks}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs h-8">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="text-xs h-8 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmReject}
            >
              Yes, Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default IdeaDetail;
