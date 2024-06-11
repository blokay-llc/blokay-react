import { useState, useContext, useId } from "react";
import { Icon, Loader } from "../Index";
import { Context } from "../../BlokayProvider";

type FileProps = {
  label?: string;
  preview?: string;
  classSelector?: string;
  endpoint?: string;
  size?: string;
  onError?: any;
  onDone?: any;
  onChangeFiles?: any;
};
export default function File({
  label,
  preview,
  classSelector,
  endpoint = "brain/uploadAsset",
  size = "md",
  onError,
  onDone,
  onChangeFiles,
}: FileProps) {
  const { api } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [prev, setPrev] = useState("");
  const id = useId();

  const ext = (): string => {
    const file = prev || preview;
    return file ? file.split(".").pop() || "" : "";
  };
  const previewImage = (): string => {
    const file = prev || preview || "";

    if (["png", "jpeg", "jpg", "bmp", "webp"].includes(ext())) {
      return file;
    }
    return "";
  };

  const onChange = () => {
    const el: any = document.getElementById(id);
    const list = el.files;
    if (list.length > 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", list[0]);

      return api
        .sendFile(endpoint, formData)
        .then((result: any) => {
          onDone && onDone(result);
          if (result.data.Resource) {
            setPrev(result.data.Resource.preview);
            onChangeFiles && onChangeFiles(result.data.Resource);
          }
        })
        .catch((err: any) => {
          onError && onError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const renderImage = () => {
    if (loading) {
      return <Loader className="bl-mx-auto bl-px-3" size="sm" />;
    } else if (previewImage()) {
      return (
        <img
          src={previewImage()}
          alt="preview"
          className="bl-rounded-lg bl-mx-auto"
          style={{ width: "50px", height: "50px" }}
        />
      );
    } else if (ext() === "pdf") {
      return (
        <Icon
          icon="pdf"
          className="bl-h-10 bl-fill-neutral-800 dark:bl-fill-neutral-200"
        />
      );
    } else if (["csv", "xls", "xlsx"].includes(ext())) {
      return (
        <Icon
          icon="excel"
          className="bl-h-10 bl-fill-neutral-800 dark:bl-fill-neutral-200"
        />
      );
    } else {
      return (
        <Icon
          icon="upload"
          className="bl-h-10 bl-fill-neutral-800 dark:bl-fill-neutral-200"
        />
      );
    }
  };

  return (
    <div
      className={`bl-p-2 bl-rounded-lg bl-inline-block bl-bg-neutral-100 dark:bl-bg-white/5 dark:bl-border-neutral-900 dark:hover:bl-bg-black bl-border-2 bl-border-neutral-200 hover:bl-bg-neutral-200 bl-w-full  ${classSelector} ${size}`}
    >
      <input type="file" className="bl-hidden" id={id} onChange={onChange} />

      <label
        htmlFor={id}
        className=" bl-items-center bl-gap-3 bl-cursor-pointer bl-flex"
      >
        <div className="bl-prev">{renderImage()}</div>

        <div>
          {label ? (
            <div className="bl-text-sm bl-block bl-py-1 bl-text-neutral-800 dark:bl-text-neutral-100 bl-font-medium">
              {label}
            </div>
          ) : null}

          <div className="bl-text-left bl-font-light bl-text-xs bl-text-neutral-600 dark:bl-text-neutral-300">
            <p className="md:hidden bl-block">Click here to select a file</p>
            <p className="hidden md:bl-block">Touch here to select.</p>
          </div>
        </div>
      </label>
    </div>
  );
}
