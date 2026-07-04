import type { ReactNode } from "react";

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right";
}

export interface TableProps {
  columns: TableColumn[];
  rows: Record<string, ReactNode>[];
  /** Description de la table pour les lecteurs d'écran */
  caption: string;
}

export function Table({ columns, rows, caption }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-nora-card border border-nora-line">
      <table className="w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-nora-line bg-nora-surface">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={
                  "px-4 py-3 text-xs font-semibold tracking-wider text-nora-muted uppercase " +
                  (column.align === "right" ? "text-right" : "text-left")
                }
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-nora-line last:border-0">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={
                    "px-4 py-3 text-nora-ink " +
                    (column.align === "right" ? "text-right tabular-nums" : "text-left")
                  }
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
