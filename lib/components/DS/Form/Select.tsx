import { useId } from "react";

export type SelectProps = {
  [x: string]: any;
  label: string;
  value: string;
  placeholder?: string;
  children: any;
  error?: string | null;
};
export default function Select({
  label,
  value,
  children,
  error = null,
  ...extraProps
}: SelectProps) {
  const id = useId();

  return (
    <div className="bl-relative ">
      <label
        htmlFor={id}
        className={` bl-absolute bl-left-4 bl-appearance-none	 bl-text-neutral-600 dark:bl-text-neutral-500 
          bl-top-2 bl-text-xs bl-font-light bl-duration-300`}
      >
        {label}
      </label>
      <div>
        <select
          {...extraProps}
          id={id}
          onChange={(e) => {
            extraProps.onChange && extraProps.onChange(e.target.value);
          }}
          onBlur={() => {
            extraProps.onBlur && extraProps.onBlur();
          }}
          onFocus={() => {
            extraProps.onFocus && extraProps.onFocus();
          }}
          value={value}
          className={`bl-app-input ${error ? "bl-error" : ""}  ${
            extraProps.className
          }`}
        >
          {children}
        </select>

        {error && <div className="bl-input-error">{error}</div>}
      </div>
    </div>
  );
}
