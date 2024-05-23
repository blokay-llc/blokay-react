import { Icon } from "../Index";

type AppCheckboxProps = {
  [x: string]: any;
  label?: string;
  value: boolean;
  onChange?: (value: boolean) => void;
};
export default function AppCheckbox({
  label = "",
  value,
  ...extraProps
}: AppCheckboxProps) {
  return (
    <div>
      <label className="bl-rounded-lg bl-bg-gray-50 bl-border-2 bl-border-gray-100 bl-px-2 bl-items-center bl-py-1 bl-flex bl-gap-2  bl-select-none dark:bl-bg-stone-900 dark:bl-border-stone-900">
        <input
          type="checkbox"
          onChange={() => {
            extraProps.onChange && extraProps.onChange(!value);
          }}
          value={value == true ? "true" : undefined}
          className="bl-hidden"
        />
        <div
          className="bl-size-6 bl-rounded-lg bl-border-2 bl-border-gray-200 dark:bl-border-stone-600"
          style={{ flexShrink: 0 }}
        >
          {value && (
            <Icon
              icon="check"
              className="bl-fill-stone-900 dark:bl-fill-stone-200"
            />
          )}
        </div>
        <div className="bl-text-sm bl-font-light bl-text-stone-600 dark:bl-text-stone-300">
          {label || extraProps.children}
        </div>
      </label>
    </div>
  );
}
