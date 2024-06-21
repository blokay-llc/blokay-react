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
    className = "",
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
    if (classColor) {
      return classColor;
    } else if (disabled) {
      return "bl-btn-disabled";
    } else if (variant === "primary") {
      return `bl-btn-primary`;
    } else if (variant === "secondary") {
      return "bl-btn-secondary";
    } else if (variant === "third") {
      return "bl-btn-third";
    } else if (variant === "neutral") {
      return "bl-btn-neutral";
    }
  };
  const classBtn = () => {
    return `bl-btn${className ? " " + className : ""}`;
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
