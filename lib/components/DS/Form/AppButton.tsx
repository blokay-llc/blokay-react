import { AppLoader, AppIcon } from "../Index";

const AppButton = function (props: any) {
  const {
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
    color = "yellow",
    ...extraProps
  } = props;

  const tag = () => {
    if (href) return "a";
    if (to) return "router-link"; // Assuming you are using React Router
    return "button";
  };

  const classBtn = () => {
    let sizeClass = `bl-py-1 bl-px-2 bl-text-sm`;
    if (size === "md") {
      sizeClass = `bl-py-2 bl-px-2 bl-text-sm`;
    } else if (size === "sm") {
      sizeClass = `bl-py-1.5 bl-px-2 bl-text-xs md:bl-text-sm`;
    } else if (size === "lg") {
      sizeClass = `bl-py-3 bl-px-5 bl-text-sm`;
    }

    let colorClass = "";
    if (disabled)
      colorClass =
        " bl-bg-stone-100 dark:bl-bg-stone-700 dark:bl-text-stone-400 bl-text-gray-500 bl-cursor-not-allowed	 ";
    else {
      if (classColor) colorClass = classColor;
      else if (variant === "primary") {
        colorClass = ` bl-border-transparent  `;
      } else if (variant === "secondary") {
        colorClass =
          " bl-text-stone-500 bl-border-stone-300 dark:bl-border-stone-700 bl-border-2 ";
      } else if (variant === "third") {
        colorClass =
          "bl-text-black bl-border-black bl-rounded-none bl-border-none hover:bl-bg-gray-100 bl-black-icon";
      } else if (variant === "neutral") {
        colorClass =
          "bl-text-gray-500 bl-bg-neutral-200 hover:bl-bg-neutral-300 bl-border-transparent";
      }

      if (variant === "primary") {
        colorClass =
          " bl-border-black bl-bg-black dark:bl-text-black dark:bl-bg-white dark:hover:bl-bg-stone-200 hover:bl-bg-black bl-text-white ";
      } else if (color == "green") {
        colorClass =
          " bl-border-green-300 bl-bg-green-300 hover:bl-bg-green-500 bl-text-green-900 ";
      }
    }

    return `${sizeClass} ${colorClass} bl-appearance-none bl-rounded-lg md:bl-rounded-lg bl-inline-block focus:bl-outline-none  bl-font-base   ${extraProps.className}`;
  };

  const propsComputed = () => {
    const propsObj: any = { type: props.type || "button" };
    if (href) propsObj.href = href;
    if (to) propsObj.to = to; // Assuming you are using React Router
    return propsObj;
  };

  return (
    <>
      {tag() === "button" && (
        <button
          className={`${classBtn()}   ${!disabled ? "bl-scale-hover" : ""} ${
            disabled ? "bl-disabled" : ""
          }`}
          target={target}
          {...propsComputed()}
          onClick={props.onClick}
          disabled={disabled}
        >
          {text && (
            <span>
              <div className="bl-flex bl-justify-center bl-items-center bl-gap-2">
                {icon && (
                  <div style={{ flexShrink: 0 }} className="bl-icon-btn">
                    {loading ? (
                      <div className="bl-mx-auto">
                        <AppLoader size="sm" />
                      </div>
                    ) : (
                      <div
                        className={
                          "bl-h-4 md:bl-h-4 w-4 bl-icon-btn " + variant
                        }
                      >
                        <AppIcon icon={icon} className="bl-w-full bl-h-full" />
                      </div>
                    )}
                  </div>
                )}
                <span>{text}</span>
              </div>
            </span>
          )}
          {!text && props.children} {/* Render the slot content */}
        </button>
      )}
      {tag() === "a" && (
        <a
          className={`${classBtn()}  ${!disabled ? "bl-scale-hover" : ""} ${
            disabled ? "bl-disabled" : ""
          }`}
          target={target}
          {...propsComputed()}
          onClick={props.onClick}
        >
          {text && (
            <span>
              <div className="bl-flex bl-justify-center bl-items-center bl-gap-2">
                <div style={{ flexShrink: 0 }} className="bl-icon-btn">
                  {loading ? (
                    <div className="bl-mx-auto">
                      <AppLoader size="sm" />
                    </div>
                  ) : icon ? (
                    <div
                      className={
                        "bl-h-4 md:bl-h-4 bl-w-4 bl-icon-btn " + variant
                      }
                    >
                      <AppIcon icon={icon} />
                    </div>
                  ) : null}
                </div>
                <span>{text}</span>
              </div>
            </span>
          )}
          {!text && props.children}
        </a>
      )}
    </>
  );
};

// AppButton.propTypes = {
//   disabled: PropTypes.bool,
//   size: PropTypes.string,
//   variant: PropTypes.string,
//   href: PropTypes.string,
//   to: PropTypes.object,
//   target: PropTypes.string,
//   loading: PropTypes.bool,
//   icon: PropTypes.string,
//   text: PropTypes.string,
//   classColor: PropTypes.string,
// };

export default AppButton;
