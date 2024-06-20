import { Loader, Icon } from "../Index";

type Props = {
  disabled?: boolean;
  size?: string;
  variant?: string;
  href?: string;
  to?: string;
  target?: string;
  loading?: boolean;
  icon?: string;
  text?: string;
  classColor?: string;
  children?: any;
  onClick?: any;
  className?: string;
  type?: string;
};

const Button = function (props: Props) {
  const {
    type,
    disabled = false,
    size,
    variant,
    href,
    to,
    target,
    loading,
    icon,
    text,
    classColor,
    onClick,
    className,
  } = props;

  const tag = () => {
    if (href) return "a";
    return "button";
  };

  const classNameSize = () => {
    let sizeClass = `bl-py-1 bl-px-2 bl-text-sm`;
    if (size === "lg") {
      sizeClass = `bl-py-3 bl-px-5 bl-text-sm`;
    } else if (size === "md") {
      sizeClass = `bl-py-1.5 bl-px-2 bl-text-sm`;
    } else if (size === "sm") {
      sizeClass = `bl-py-1.5 bl-px-2 bl-text-xs md:bl-text-sm`;
    } else if (size === "xs") {
      sizeClass = `bl-py-1 bl-px-3 bl-text-xs`; // TODO
    }

    return sizeClass;
  };

  const classNameColor = () => {
    let colorClass = "";

    if (classColor) {
      colorClass = classColor;
    } else if (disabled) {
      colorClass =
        " bg-disabled bl-bg-neutral-100 bl-border-neutral-100 dark:bl-bg-neutral-700 dark:bl-border-neutral-700 dark:bl-text-neutral-400 bl-text-gray-500 bl-cursor-not-allowed	 ";
    } else if (variant === "primary") {
      colorClass = `  bl-border-black bl-bg-black dark:bl-text-black dark:bl-bg-white dark:hover:bl-bg-neutral-200 hover:bl-bg-black bl-text-white   `;
    } else if (variant === "secondary") {
      colorClass =
        " bl-text-blue-900  bl-border-transparent bl-border-2 bl-bg-blue-400 dark:bl-text-blue-300 dark:bl-bg-blue-950/70 dark:hover:bl-bg-blue-900 ";
    } else if (variant === "third") {
      colorClass =
        "bl-text-neutral-900  bl-border-transparent bl-border-2 bl-bg-neutral-400 dark:bl-text-neutral-300 dark:bl-bg-neutral-800 dark:hover:bl-bg-neutral-700 ";
    } else if (variant === "neutral") {
      colorClass =
        "bl-text-gray-500 bl-bg-neutral-200 hover:bl-bg-neutral-300 bl-border-transparent";
    }
    return colorClass;
  };
  const classBtn = () => {
    return `bl-appearance-none bl-border-2 bl-rounded-lg bl-inline-block focus:bl-outline-none  bl-font-base  bl-scale-hover bl-shadow-sm ${className}`;
  };

  const propsComputed = () => {
    const propsObj: any = { type: type || "button" };
    if (href) propsObj.href = href;
    if (to) propsObj.to = to;
    return propsObj;
  };

  const classNameIcon = () => {
    let color = "";
    if (variant === "primary") {
      color = ` bl-h-full bl-fill-white dark:bl-fill-black  `;
    } else if (variant === "secondary") {
      color = ` bl-h-full bl-fill-blue-800 dark:bl-fill-blue-300  `;
    } else if (variant === "third") {
      color = ` bl-h-full bl-fill-neutral-800 dark:bl-fill-neutral-300  `;
    }

    return `bl-h-full bl-h-4 md:bl-h-4 w-4 ${color}`;
  };
  const ComponentName = tag();

  return (
    <ComponentName
      className={`${classBtn()} ${classNameColor()} ${classNameSize()}`}
      target={target}
      {...propsComputed()}
      onClick={onClick}
      disabled={disabled}
    >
      {(text || icon) && (
        <span>
          <div className="bl-flex bl-justify-center bl-items-center bl-gap-2">
            {loading && (
              <div style={{ flexShrink: 0 }} className="bl-icon-btn">
                <Loader size="sm" />
              </div>
            )}

            {icon && !loading && (
              <div style={{ flexShrink: 0 }} className="bl-icon-btn">
                <Icon icon={icon} className={classNameIcon()} />
              </div>
            )}

            {text && <span>{text}</span>}
          </div>
        </span>
      )}
      {!text && props.children}
    </ComponentName>
  );
};

export default Button;
