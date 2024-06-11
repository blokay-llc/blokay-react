import { useId } from "react";

export type SelectProps = {
  [x: string]: any;
  label: string;
  value: string;
  placeholder?: string;
  error?: string | null;
};
export default function Textarea({
  label,
  value,
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
        <textarea
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
        />

        {error && (
          <div className="bl-text-left bl-text-red-500 bl-text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
