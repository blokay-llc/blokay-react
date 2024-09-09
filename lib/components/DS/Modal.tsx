import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Index";
import { CSSTransition } from "react-transition-group";

const container = typeof document != "undefined" ? document.body : null;

type ModalProps = {
  title?: string | null;
  position?: "top" | "center" | "bottom";
  bgColor?: string;
  classSection?: string | null;
  size?: "sm" | "md" | "lg" | "auto";
  children?: any;
  footer?: JSX.Element | null;
  clickBack?: null | (() => void);
  onClose?: null | (() => void);
  onConfirmClose?: null | (() => void);
};
function Modal(props: ModalProps, ref: any) {
  const {
    title = "",
    position = "center",
    classSection = null,
    size = "sm",
    children,
    footer,
    clickBack = null,
    onClose = null,
    onConfirmClose = null,
  } = props;
  const [showing, setShowing] = useState(false);
  const [bgColor, setBackgroundColor] = useState(props.bgColor || "white");
  const [error, setError] = useState("");

  const showModal = () => {
    setShowing(true);
  };

  const tryClose = () => {
    if (onConfirmClose) {
      onConfirmClose && onConfirmClose();
    } else {
      hideModal();
    }
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
    tryClose,
    showModal,
    hideModal,
    clear,
    putError,
    changeColorModal,
  }));

  const positionClass = () => {
    if (position === "center") {
      return "justify-center items-center rounded-3xl";
    }
    return "";
  };

  const sizeClass = () => {
    if (size === "sm") {
      return "lg:w-96 w-full mx-3 ";
    } else if (size === "md") {
      return "lg:w-1/2 w-full mx-3 ";
    } else if (size === "lg") {
      return "lg:w-2/3 w-full mx-3 ";
    } else if (size === "auto") {
      return "lg:w-max-2/3 w-min-1/3 overflow-x-auto  mx-3 ";
    }
    return "";
  };

  useEffect(() => {
    function escFunction(event: any) {
      if (event.key === "Escape") {
        tryClose();
      }
    }
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [tryClose]);

  return container
    ? createPortal(
        <>
          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={showing}
            timeout={{ enter: 300, exit: 300 }}
            classNames="modal-back"
          >
            <div className="fixed z-50 backdrop-blur-sm bg-neutral-600/40  top-0 left-0 w-full h-screen"></div>
          </CSSTransition>

          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={showing}
            timeout={{ enter: 500, exit: 500 }}
            classNames="modalx"
          >
            <div
              onMouseDown={(e) => e.stopPropagation()}
              onClick={tryClose}
              className="fixed z-50  w-full h-screen py-5  top-0 left-0 flex items-center justify-center"
            >
              <section
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`relative z-50 transition-all dark:text-neutral-200 duration-100 ease-in-out text-black  rounded-xl   ${sizeClass()} ${positionClass()} ${size} ${classSection} ${
                  bgColor == "white" ? "bg-white dark:bg-neutral-950" : ""
                }`}
                style={{ backgroundColor: bgColor != "white" ? bgColor : "" }}
              >
                {title && (
                  <div className="flex justify-between items-center border-b dark:border-neutral-800 border-neutral-200 py-4 px-4">
                    <div className="flex items-center justify-start gap-3">
                      <div
                        className="action-icon"
                        onClick={() => clickBack && clickBack()}
                        style={{ display: clickBack ? "block" : "none" }}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                        </svg>
                      </div>
                      <h2 className="text-base md:text-base">{title}</h2>
                    </div>
                    <div
                      className="hover:bg-neutral-200 dark:hover:bg-neutral-800 p-1 rounded-full cursor-pointer"
                      onClick={hideModal}
                    >
                      <Icon
                        className="w-6 h-6 fill-black dark:fill-neutral-200"
                        icon={position !== "bottom" ? "close" : "arrow_bottom"}
                      />
                    </div>
                  </div>
                )}
                {error && (
                  <div className=" w-full  p-3 bg-red-600 items-center text-indigo-100 leading-none flex lg:inline-flex font-light">
                    <span className="mr-2 text-left flex-auto text-white">
                      {error}
                    </span>
                  </div>
                )}
                <div
                  className={`py-5 px-4 overflow-y-auto  ${
                    error ? "with-error" : ""
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
                  <div className="py-5 px-4 border-t dark:border-neutral-800 border-neutral-200">
                    <div className="footer">{footer}</div>
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

export default forwardRef(Modal);
