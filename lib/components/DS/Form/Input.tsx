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
  autoComplete?: "on" | "off";
};

export default function Input(props: InputProps) {
  const [activeLabel, setActiveLabel] = useState(false);
  const id = useId();

  return (
    <>
      <div className="relative w-full">
        {props.icon && (
          <Icon
            className={`size-6 ${
              props.error ? "fill-red-400" : "fill-gray-400"
            } absolute bottom-2.5 right-4`}
            icon={props.icon}
          />
        )}

        <label
          onClick={() => {
            const el = document.getElementById(id);
            if (el) el.focus();
          }}
          htmlFor={id}
          className={` select-none absolute  duration-300 ${
            activeLabel || props.value || props.type === "date"
              ? " top-2 text-xs left-5 font-medium text-neutral-500 dark:text-neutral-400 "
              : " top-3 pt-0.5 left-5 font-light text-neutral-600 dark:text-neutral-500 "
          }`}
        >
          {props.label}
        </label>
        <input
          {...props}
          autoComplete={props.autoComplete || "on"}
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
          className={`app-input appearance-none ${props.error ? "error" : ""} ${
            props.className
          } `}
          type={props.type}
        />
        {props.error && <div className="input-error">{props.error}</div>}
      </div>
    </>
  );
}
