import { Icon } from "../Index";

type CheckboxProps = {
  [x: string]: any;
  label?: string;
  value: boolean;
  onChange?: (value: boolean) => void;
};
export default function Checkbox({
  label = "",
  value,
  ...extraProps
}: CheckboxProps) {
  return (
    <div>
      <label className="rounded-lg bg-gray-50 border-2 border-gray-100 px-2 items-center py-1 flex gap-2  select-none dark:bg-neutral-900 dark:border-neutral-900">
        <input
          type="checkbox"
          onChange={() => {
            extraProps.onChange && extraProps.onChange(!value);
          }}
          value={value == true ? "true" : undefined}
          className="hidden"
        />
        <div
          className="size-6 rounded-lg border-2 border-gray-200 dark:border-neutral-600"
          style={{ flexShrink: 0 }}
        >
          {value && (
            <Icon
              icon="check"
              className="fill-neutral-900 dark:fill-neutral-200"
            />
          )}
        </div>
        <div className="text-sm font-light text-neutral-600 dark:text-neutral-300">
          {label || extraProps.children}
        </div>
      </label>
    </div>
  );
}
