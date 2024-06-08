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
      sizeClass = `bl-py-2 bl-px-2 bl-text-sm`;
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
        " bg-disabled bl-bg-neutral-100 dark:bl-bg-neutral-700 dark:bl-text-neutral-400 bl-text-gray-500 bl-cursor-not-allowed	 ";
    } else if (variant === "primary") {
      colorClass = `  bl-border-black bl-bg-black dark:bl-text-black dark:bl-bg-white dark:hover:bl-bg-neutral-200 hover:bl-bg-black bl-text-white   `;
    } else if (variant === "secondary") {
      colorClass =
        " bl-text-blue-500  bl-border-transparent bl-border-2 bl-bg-blue-950/70 dark:hover:bl-bg-blue-900 ";
    } else if (variant === "third") {
      colorClass =
        "bl-text-black bl-border-black bl-rounded-none bl-border-none hover:bl-bg-gray-100 bl-black-icon";
    } else if (variant === "neutral") {
      colorClass =
        "bl-text-gray-500 bl-bg-neutral-200 hover:bl-bg-neutral-300 bl-border-transparent";
    }
    return colorClass;
  };
  const classBtn = () => {
    return `bl-appearance-none  bl-rounded-lg md:bl-rounded-lg bl-inline-block focus:bl-outline-none  bl-font-base  bl-scale-hover ${className}`;
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
    } else if (variant === "secondary" || variant === "third") {
      color = ` bl-h-full bl-fill-blue-500 dark:bl-fill-blue-500  `;
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
            {icon && (
              <div style={{ flexShrink: 0 }} className="bl-icon-btn">
                {loading ? (
                  <div className="bl-mx-auto">
                    <Loader size="sm" />
                  </div>
                ) : (
                  <Icon icon={icon} className={classNameIcon()} />
                )}
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
