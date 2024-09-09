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
    let sizeClass = `py-1 px-2 text-sm`;
    if (size === "lg") {
      sizeClass = `py-3 px-5 text-sm`;
    } else if (size === "md") {
      sizeClass = `py-1.5 px-2 text-sm`;
    } else if (size === "sm") {
      sizeClass = `py-1.5 px-2 text-xs md:text-sm`;
    } else if (size === "xs") {
      sizeClass = `py-1 px-3 text-xs`; // TODO
    }

    return sizeClass;
  };

  const classNameColor = () => {
    if (classColor) {
      return classColor;
    } else if (disabled) {
      return "btn-disabled";
    } else if (variant === "primary") {
      return `btn-primary`;
    } else if (variant === "secondary") {
      return "btn-secondary";
    } else if (variant === "third") {
      return "btn-third";
    } else if (variant === "neutral") {
      return "btn-neutral";
    }
  };
  const classBtn = () => {
    return `btn${className ? " " + className : ""}`;
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
      color = ` h-full fill-white dark:fill-black  `;
    } else if (variant === "secondary") {
      color = ` h-full fill-neutral-800 dark:fill-neutral-300  `;
    } else if (variant === "third") {
      color = ` h-full fill-neutral-800 dark:fill-neutral-300  `;
    }

    return `h-full h-4 md:h-4 w-4 ${color}`;
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
          <div className="flex justify-center items-center gap-2">
            {loading && (
              <div style={{ flexShrink: 0 }} className="icon-btn">
                <Loader size="sm" />
              </div>
            )}

            {icon && !loading && (
              <div style={{ flexShrink: 0 }} className="icon-btn">
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
