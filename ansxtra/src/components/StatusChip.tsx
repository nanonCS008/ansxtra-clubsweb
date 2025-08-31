interface StatusChipProps {
  status: 'Submitted' | 'In Review' | 'Accepted' | 'Rejected';
}

export default function StatusChip({ status }: StatusChipProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {status}
    </span>
  );
}