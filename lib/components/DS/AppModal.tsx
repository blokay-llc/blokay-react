import { forwardRef, useState, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Index";
import { CSSTransition } from "react-transition-group";

const container = typeof document != "undefined" ? document.body : null;

type ModalProps = {
  title?: string | null;
  position?: "top" | "center" | "bottom";
  classSection?: string | null;
  size?: "sm" | "md" | "lg";
  children?: any;
  footer?: any;
  clickBack?: null | (() => void);
  onClose?: null | (() => void);
};
function Modal(
  {
    title = "",
    position = "center",
    classSection = null,
    size = "sm",
    children,
    footer,
    clickBack = null,
    onClose = null,
  }: ModalProps,
  ref: any
) {
  const [showing, setShowing] = useState(false);
  const [bgColor, setBackgroundColor] = useState("white");
  const [error, setError] = useState("");

  const showModal = () => {
    setShowing(true);
  };

  const hideModal = () => {
    onClose && onClose();
    setShowing(false);
    setError("");
  };

  const clear = () => {
    setError("");
  };

  const putError = (error: string) => {
    setError(error);
  };

  const changeColorModal = (color: string) => {
    setBackgroundColor(color);
  };

  useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
    clear,
    putError,
    changeColorModal,
  }));

  const positionClass = () => {
    if (position === "center") {
      return "bl-justify-center bl-items-center bl-rounded-3xl";
    }
    return "";
  };

  const sizeClass = () => {
    if (size === "sm") {
      return "lg:bl-w-96 bl-w-full bl-mx-3 ";
    } else if (size === "md") {
      return "lg:bl-w-1/2 bl-w-full bl-mx-3 ";
    } else if (size === "lg") {
      return "lg:bl-w-2/3 bl-w-full bl-mx-3 ";
    }
    return "";
  };

  return container
    ? createPortal(
        <>
          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={showing}
            timeout={{ enter: 300, exit: 300 }}
            classNames="bl-modal-back"
          >
            <div className="bl-fixed bl-z-50 bl-backdrop-blur-sm bl-bg-stone-600/40  bl-top-0 bl-left-0 bl-w-full bl-h-screen"></div>
          </CSSTransition>

          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={showing}
            timeout={{ enter: 500, exit: 500 }}
            classNames="bl-modalx"
          >
            <div
              onMouseDown={(e) => e.stopPropagation()}
              onClick={hideModal}
              className="bl-fixed bl-z-50  bl-w-full bl-h-screen bl-py-5  bl-top-0 bl-left-0 bl-flex bl-items-center bl-justify-center"
            >
              <section
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`bl-relative bl-z-50 bl-transition-all dark:bl-text-stone-200 bl-duration-100 bl-ease-in-out bl-text-black  bl-rounded-xl   ${sizeClass()} ${positionClass()} ${size} ${classSection} ${
                  bgColor == "white" ? "bl-bg-white dark:bl-bg-stone-950" : ""
                }`}
                style={{ backgroundColor: bgColor != "white" ? bgColor : "" }}
              >
                {title && (
                  <div className="bl-flex bl-justify-between bl-items-center bl-border-b dark:bl-border-stone-800 bl-border-stone-200 bl-py-4 bl-px-4">
                    <div className="bl-flex bl-items-center bl-justify-start bl-gap-3">
                      <div
                        className="bl-action-icon"
                        onClick={() => clickBack && clickBack()}
                        style={{ display: clickBack ? "bl-block" : "bl-none" }}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                        </svg>
                      </div>
                      <h2 className="bl-text-base md:bl-text-base">{title}</h2>
                    </div>
                    <div
                      className="hover:bl-bg-stone-200 dark:hover:bl-bg-stone-800 bl-p-1 bl-rounded-full bl-cursor-pointer"
                      onClick={hideModal}
                    >
                      <Icon
                        className="bl-w-6 bl-h-6 bl-fill-black dark:bl-fill-stone-200"
                        icon={position !== "bottom" ? "close" : "arrow_bottom"}
                      />
                    </div>
                  </div>
                )}
                {error && (
                  <div className=" bl-w-full  bl-p-3 bl-bg-red-600 bl-items-center bl-text-indigo-100 bl-leading-none bl-flex lg:bl-inline-flex bl-font-light">
                    <span className="bl-mr-2 bl-text-left bl-flex-auto bl-text-white">
                      {error}
                    </span>
                  </div>
                )}
                <div
                  className={`bl-py-5 bl-px-4 bl-overflow-y-auto  ${
                    error ? "bl-with-error" : ""
                  }`}
                  style={{
                    maxHeight: `calc(100vh - ${
                      50 + (footer ? 70 : 0) + (title ? 70 : 0)
                    }px)`,
                  }}
                >
                  {children}
                </div>

                {footer && (
                  <div className="bl-py-5 bl-px-4 bl-border-t dark:bl-border-stone-800 bl-border-stone-200">
                    <div className="bl-footer">{footer}</div>
                  </div>
                )}
              </section>
            </div>
          </CSSTransition>
        </>,
        container
      )
    : null;
}

const AppModal = forwardRef(Modal);

export default AppModal;
