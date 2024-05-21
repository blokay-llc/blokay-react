"use client";
import "./form.css";

function genRandomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charLength = chars.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

export default function AppSelect({
  label,
  value,
  placeholder,
  children,
  error = null,
  ...extraProps
}: any) {
  const id = genRandomString(10);

  return (
    <div className="bl-relative ">
      <label
        htmlFor={id}
        className={` bl-absolute bl-left-4 bl-appearance-none	 bl-text-stone-600 dark:bl-text-stone-500 
          bl-top-2 bl-text-xs bl-font-light`}
        style={{ transitionDuration: "0.3s" }}
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
          type="text"
          placeholder={placeholder}
        >
          {children}
        </select>

        {error && (
          <div className="bl-text-left bl-text-red-500 bl-text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
