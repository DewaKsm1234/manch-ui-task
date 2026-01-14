import { StarRating } from './StarRating';

interface Column {
  key: string;
  label: string;
}

interface SimpleTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
}

export function SimpleTable({ columns, data }: SimpleTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No data available
      </div>
    );
  }

  const renderCell = (col: Column, value: unknown) => {
    if (col.key === 'rating') {
      if (typeof value === 'number') {
        return <StarRating rating={value} size="sm" />;
      }
      return <span className="text-muted-foreground text-xs">Not rated</span>;
    }

    if (col.key === 'department') {
      return (
        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
          {String(value ?? '')}
        </span>
      );
    }

    if (col.key === 'employeeId') {
      return <span className="font-mono">{String(value ?? '')}</span>;
    }

    return String(value ?? '-');
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-sm text-foreground text-left"
                >
                  {renderCell(col, row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
