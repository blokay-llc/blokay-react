import { useId } from "react";

export type TextareaProps = {
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
}: TextareaProps) {
  const id = useId();

  return (
    <div className="relative ">
      <label
        htmlFor={id}
        className={` absolute left-4 appearance-none	 text-neutral-600 dark:text-neutral-500 
          top-2 text-xs font-light duration-300`}
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
          className={`app-input ${error ? "error" : ""}  ${
            extraProps.className
          }`}
        />

        {error && <div className="input-error">{error}</div>}
      </div>
    </div>
  );
}
