import { IdeaStatus, STATUS_LABELS } from "@/types/idea";

const StatusBadge = ({ status }: { status: IdeaStatus }) => {
  const cls = (() => {
    switch (status) {
      case "pending_hod":
      case "pending_md":
        return "status-pending";
      case "approved":
        return "status-approved";
      case "rejected_hod":
      case "rejected_md":
        return "status-rejected";
      // In StatusBadge.tsx
      case "completed":
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-medium">
            Completed
          </span>
        );

      default:
        return "";
    }
  })();

  console.log("status", status);

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${cls}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};

export default StatusBadge;
