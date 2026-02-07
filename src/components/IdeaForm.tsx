import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdeas } from "@/context/IdeasContext";
import {
  IdeaType,
  Department,
  IDEA_TYPES,
  DEPARTMENTS,
  FlowchartData,
} from "@/types/idea";
import RichTextEditor from "./RichTextEditor";
import FlowchartEditor from "./FlowchartEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, GitBranch, Save, Lightbulb, ArrowLeft } from "lucide-react";
import ideaDoodle from "@/assets/images/read-doodle.png"; // Adjust path based on your folder structure

const IdeaForm = () => {
  const { currentUser, addIdea, totalIdeasCount } = useIdeas();
  const navigate = useNavigate();
  const [ideaType, setIdeaType] = useState<IdeaType | "">("");
  const [functionTheme, setFunctionTheme] = useState<Department | "">("");
  const [description, setDescription] = useState("");
  const [flowchart, setFlowchart] = useState<FlowchartData | null>(null);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const previewRefNo = (() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const fy1 = m >= 3 ? y % 100 : (y - 1) % 100;
    return `${String(fy1).padStart(2, "0")}-${String(fy1 + 1).padStart(2, "0")}/${String(totalIdeasCount + 1).padStart(4, "0")}`;
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaType || !functionTheme) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!description && (!flowchart || flowchart.nodes.length === 0)) {
      toast.error("Please add a description or flowchart");
      return;
    }
    addIdea({
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      employeeDept: currentUser.dept,
      submissionDate: new Date().toISOString(),
      ideaType: ideaType as IdeaType,
      functionTheme: functionTheme as Department,
      description,
      flowchart,
    });
    toast.success("Idea submitted successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6">
      <div className="container mx-auto px-4">
        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
          {/* Left Side - Form (Full width on mobile, flexible on desktop) */}
          <form onSubmit={handleSubmit} className="animate-fade-in">
            <div className="bg-card rounded-xl border shadow-lg">
              {/* Header Section */}
              <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-purple-500/5">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Submit New Idea
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { label: "Employee ID", value: currentUser.id },
                    { label: "Name", value: currentUser.name },
                    { label: "Department", value: currentUser.dept },
                    { label: "Date", value: today },
                    {
                      label: "Reference No.",
                      value: previewRefNo,
                      highlight: true,
                    },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
                        {f.label}
                      </label>
                      <div
                        className={`text-xs font-medium mt-0.5 ${f.highlight ? "font-mono text-primary font-bold" : ""}`}
                      >
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1.5 block">
                      Idea Type <span className="text-destructive">*</span>
                    </label>
                    <Select
                      value={ideaType}
                      onValueChange={(val) => setIdeaType(val as IdeaType)}
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="Select idea type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        {Object.entries(IDEA_TYPES).map(([k, v]) => (
                          <SelectItem key={k} value={k} className="text-xs">
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1.5 block">
                      Function / Theme{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <Select
                      value={functionTheme}
                      onValueChange={(val) =>
                        setFunctionTheme(val as Department)
                      }
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        {Object.entries(DEPARTMENTS).map(([k, v]) => (
                          <SelectItem key={k} value={k} className="text-xs">
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="h-8 bg-muted/50">
                    <TabsTrigger
                      value="description"
                      className="text-xs h-7 gap-1.5"
                    >
                      <FileText className="h-3.5 w-3.5" /> Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="flowchart"
                      className="text-xs h-7 gap-1.5"
                    >
                      <GitBranch className="h-3.5 w-3.5" /> Flowchart
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-3">
                    <RichTextEditor
                      value={description}
                      onChange={setDescription}
                      placeholder="Describe your cost saving idea in detail..."
                    />
                  </TabsContent>
                  <TabsContent value="flowchart" className="mt-3">
                    <FlowchartEditor
                      value={flowchart}
                      onChange={setFlowchart}
                    />
                    <p className="text-[10px] text-muted-foreground mt-2">
                      💡 Add shapes, connect them, double-click to edit text.
                      Scroll & resize supported. Data stored as JSON
                      (SQL-ready).
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 p-4 border-t bg-muted/20">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="text-xs h-8 gap-1.5">
                  <Save className="h-3.5 w-3.5" /> Submit Idea
                </Button>
              </div>
            </div>
          </form>

          {/* Right Side - Small Sticky Doodle (Hidden on mobile, small on desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-20 animate-fade-in">
              <div className="flex justify-center">
                <img
                  src={ideaDoodle}
                  alt="Person thinking and getting creative ideas"
                  className="w-48 h-auto drop-shadow-xl rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaForm;
