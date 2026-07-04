import { useId } from "react";
import type { InputHTMLAttributes } from "react";

interface ToggleFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  label: string;
  hint?: string;
}

function toggleRow(id: string, label: string, hint: string | undefined, input: React.ReactNode) {
  return (
    <div className="flex items-start gap-3">
      {input}
      <span className="grid gap-0.5">
        <label htmlFor={id} className="cursor-pointer text-sm font-medium text-nora-ink">
          {label}
        </label>
        {hint && <span className="text-xs text-nora-muted">{hint}</span>}
      </span>
    </div>
  );
}

const nativeToggle =
  "mt-0.5 size-4 shrink-0 cursor-pointer " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent";

export function Checkbox({ label, hint, ...rest }: ToggleFieldProps) {
  const id = useId();
  return toggleRow(
    id,
    label,
    hint,
    <input
      id={id}
      type="checkbox"
      className={nativeToggle}
      style={{ accentColor: "var(--nora-accent)" }}
      {...rest}
    />,
  );
}

export function Radio({ label, hint, ...rest }: ToggleFieldProps) {
  const id = useId();
  return toggleRow(
    id,
    label,
    hint,
    <input
      id={id}
      type="radio"
      className={nativeToggle}
      style={{ accentColor: "var(--nora-accent)" }}
      {...rest}
    />,
  );
}

export interface SwitchProps {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ label, hint, checked, onChange, disabled }: SwitchProps) {
  const id = useId();
  return toggleRow(
    id,
    label,
    hint,
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={
        "relative h-5 w-9 shrink-0 cursor-pointer rounded-nora-full transition-colors duration-150 " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent " +
        "disabled:cursor-not-allowed disabled:opacity-50 " +
        (checked ? "bg-nora-accent" : "bg-nora-line-strong")
      }
    >
      <span
        aria-hidden="true"
        className={
          "absolute top-0.5 left-0.5 size-4 rounded-nora-full bg-nora-surface transition-transform duration-150 " +
          (checked ? "translate-x-4" : "")
        }
      />
    </button>,
  );
}
