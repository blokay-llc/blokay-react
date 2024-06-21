import { useState, useId } from "react";
import { Icon } from "../Index";

type InputProps = {
  disabled?: boolean;
  label: string;
  className?: string;
  value?: string;
  icon?: string;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: "text" | "password" | "number" | "date" | "email" | "url" | "tel";
  autocomplete?: "on" | "off";
};

export default function Input(props: InputProps) {
  const [activeLabel, setActiveLabel] = useState(false);
  const id = useId();

  return (
    <div className="bl-w-full">
      <div className="bl-relative ">
        {props.icon && (
          <Icon
            className={`bl-size-6 ${
              props.error ? "bl-fill-red-400" : "bl-fill-gray-400"
            } bl-absolute bl-bottom-2.5 bl-right-4`}
            icon={props.icon}
          />
        )}

        <label
          onClick={() => {
            const el = document.getElementById(id);
            if (el) el.focus();
          }}
          htmlFor={id}
          className={` bl-select-none bl-absolute  bl-text-neutral-500 dark:bl-text-neutral-400 bl-duration-300 ${
            activeLabel || props.value || props.type === "date"
              ? " bl-top-2 bl-text-xs bl-left-5 bl-font-medium"
              : " bl-top-3 bl-pt-0.5 bl-left-5 bl-font-light bl-text-neutral-600 dark:bl-text-neutral-500 "
          }`}
        >
          {props.label}
        </label>
        <div>
          <input
            {...props}
            autoComplete={props.autocomplete || "on"}
            id={id}
            onChange={(e) => {
              props.onChange && props.onChange(e.target.value);
            }}
            onBlur={() => {
              setActiveLabel(false);
              props.onBlur && props.onBlur();
            }}
            onFocus={() => {
              setActiveLabel(true);
              props.onFocus && props.onFocus();
            }}
            disabled={props.disabled || false}
            value={props.value || ""}
            className={`bl-app-input bl-appearance-none ${
              props.error ? "bl-error" : ""
            } ${props.className} `}
            type={props.type}
          />
        </div>
      </div>
      {props.error && (
        <div className="bl-text-left bl-text-red-500 bl-text-sm bl-font-light">
          {props.error}
        </div>
      )}
    </div>
  );
}
