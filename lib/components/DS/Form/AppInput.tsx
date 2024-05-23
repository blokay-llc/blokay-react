import { useState } from "react";
import { Icon } from "../Index";

function genRandomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charLength = chars.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

type InputProps = {
  [x: string]: any;
  label: string;
  value?: string;
  icon?: string;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: "text" | "password" | "number" | "date";
};

export default function Input({
  label,
  value,
  icon = "",
  error = "",
  ...extraProps
}: InputProps) {
  const [activeLabel, setActiveLabel] = useState(false);
  const [id] = useState(genRandomString(10));

  return (
    <div className="bl-w-full">
      <div className="bl-relative ">
        {icon && (
          <Icon
            className={`bl-size-6 ${
              error ? "bl-fill-red-400" : "bl-fill-gray-400"
            } bl-absolute bl-bottom-2.5 bl-right-4`}
            icon={icon}
          />
        )}

        <label
          onClick={() => {
            const el = document.getElementById(id);
            if (el) el.focus();
          }}
          htmlFor={id}
          className={` bl-select-none bl-absolute  bl-text-stone-500 dark:bl-text-stone-400 ${
            activeLabel || value || extraProps.type === "date"
              ? " bl-top-2 bl-text-xs bl-left-5 bl-font-medium"
              : " bl-top-3 bl-pt-0.5 bl-left-5 bl-font-light bl-text-stone-600 dark:bl-text-stone-500 "
          }`}
          style={{ transitionDuration: "0.3s" }}
        >
          {label}
        </label>
        <div>
          <input
            {...extraProps}
            id={id}
            onChange={(e) => {
              extraProps.onChange && extraProps.onChange(e.target.value);
            }}
            onBlur={() => {
              setActiveLabel(false);
              extraProps.onBlur && extraProps.onBlur();
            }}
            onFocus={() => {
              setActiveLabel(true);
              extraProps.onFocus && extraProps.onFocus();
            }}
            value={value || ""}
            className={`bl-app-input bl-appearance-none   ${
              error ? "bl-error" : ""
            } ${extraProps.className} `}
            type={extraProps.type}
          />
        </div>
      </div>
      {error && (
        <div className="bl-text-left bl-text-red-500 bl-text-sm">{error}</div>
      )}
    </div>
  );
}
