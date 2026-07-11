import { Fragment, useState, type ReactNode } from "react";

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right";
}

/**
 * A row's cells, keyed by column. An optional `detail` makes the row
 * expandable: clicking it toggles a full-width sub-row with that content.
 */
export type TableRow = Record<string, ReactNode> & { detail?: ReactNode };

export interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
  /** Description de la table pour les lecteurs d'écran */
  caption: string;
}

export function Table({ columns, rows, caption }: TableProps) {
  const [open, setOpen] = useState<number | null>(null);
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
          {rows.map((row, index) => {
            const expandable = row.detail != null;
            const isOpen = open === index;
            return (
              <Fragment key={index}>
                <tr
                  className={
                    "border-b border-nora-line last:border-0 " +
                    (expandable
                      ? "cursor-pointer hover:bg-nora-surface"
                      : "")
                  }
                  onClick={
                    expandable
                      ? () => setOpen(isOpen ? null : index)
                      : undefined
                  }
                  aria-expanded={expandable ? isOpen : undefined}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={
                        "px-4 py-3 text-nora-ink " +
                        (column.align === "right"
                          ? "text-right tabular-nums"
                          : "text-left")
                      }
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
                {expandable && isOpen ? (
                  <tr className="border-b border-nora-line last:border-0 bg-nora-surface">
                    <td colSpan={columns.length} className="px-4 py-3">
                      {row.detail}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
