import { IdeaStatus, STATUS_LABELS } from '@/types/idea';

const StatusBadge = ({ status }: { status: IdeaStatus }) => {
  const cls = (() => {
    switch (status) {
      case 'pending_hod':
      case 'pending_md':
        return 'status-pending';
      case 'approved':
        return 'status-approved';
      case 'rejected_hod':
      case 'rejected_md':
        return 'status-rejected';
      case 'in_execution':
        return 'status-execution';
      default:
        return '';
    }
  })();

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${cls}`}>
      {STATUS_LABELS[status]}
    </span>
  );
};

export default StatusBadge;
