import React, { useEffect, useRef, useState } from "react";

type Option = {
  label: React.ReactNode;
  value: string;
};

type SelectProps = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  renderTrigger?: (selected: Option | undefined, open: boolean) => React.ReactNode;
};

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select",
  disabled,
  className = "",
  renderTrigger,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  function select(val: string) {
    onChange?.(val);
    setOpen(false);
  }

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(v => !v)}
        className="w-full"
      >
        {renderTrigger ? (
          renderTrigger(selected, open)
        ) : (
          <div className="border rounded-md px-3 py-2 bg-white">
            {selected?.label ?? placeholder}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md max-h-60 overflow-auto">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => select(opt.value)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
