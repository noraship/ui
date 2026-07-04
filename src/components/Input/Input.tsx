import { useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

const fieldClasses = (error: boolean) =>
  "w-full bg-nora-field text-nora-ink text-sm rounded-nora-ctl px-3.5 py-2.5 " +
  "placeholder:text-nora-muted border " +
  "focus-visible:outline-2 focus-visible:outline-offset-1 " +
  (error
    ? "border-nora-danger-text focus-visible:outline-nora-danger-text"
    : "border-nora-line-strong focus-visible:outline-nora-accent");

interface FieldWrapperProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

function FieldWrapper({ id, label, hint, error, children }: FieldWrapperProps) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-nora-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-nora-danger-text">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-xs text-nora-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "prefix"> {
  label: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, ...rest }: InputProps) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        className={fieldClasses(Boolean(error))}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...rest}
      />
    </FieldWrapper>
  );
}

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  label: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, rows = 4, ...rest }: TextareaProps) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        className={fieldClasses(Boolean(error))}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...rest}
      />
    </FieldWrapper>
  );
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export function Select({ label, hint, error, children, ...rest }: SelectProps) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        className={fieldClasses(Boolean(error)) + " appearance-none cursor-pointer"}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...rest}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}
