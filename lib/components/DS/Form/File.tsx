import { useState, useId } from "react";
import { Icon, Loader } from "../Index";

import useSession from "../../../hooks/useSession";
import useApi from "../../../hooks/useApi";

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
  const jwt = (window as any).BLOKAY_JWT;
  const session = useSession(jwt);
  const api = useApi("https://app.blokay.com/api/", session);

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
      return <Loader className="mx-auto px-3" size="sm" />;
    } else if (previewImage()) {
      return (
        <img
          src={previewImage()}
          alt="preview"
          className="rounded-lg mx-auto"
          style={{ width: "50px", height: "50px" }}
        />
      );
    } else if (ext() === "pdf") {
      return (
        <Icon
          icon="pdf"
          className="h-10 fill-neutral-800 dark:fill-neutral-200"
        />
      );
    } else if (["csv", "xls", "xlsx"].includes(ext())) {
      return (
        <Icon
          icon="excel"
          className="h-10 fill-neutral-800 dark:fill-neutral-200"
        />
      );
    } else {
      return (
        <Icon
          icon="upload"
          className="h-10 fill-neutral-800 dark:fill-neutral-200"
        />
      );
    }
  };

  return (
    <div
      className={`p-2 rounded-lg inline-block bg-neutral-100 dark:bg-white/5 dark:border-neutral-900 dark:hover:bg-black border-2 border-neutral-200 hover:bg-neutral-200 w-full  ${classSelector} ${size}`}
    >
      <input type="file" className="hidden" id={id} onChange={onChange} />

      <label htmlFor={id} className=" items-center gap-3 cursor-pointer flex">
        <div className="prev">{renderImage()}</div>

        <div>
          {label ? (
            <div className="text-sm block py-1 text-neutral-800 dark:text-neutral-100 font-medium">
              {label}
            </div>
          ) : null}

          <div className="text-left font-light text-xs text-neutral-600 dark:text-neutral-300">
            <p className="md:hidden block">Click here to select a file</p>
            <p className="hidden md:block">Touch here to select.</p>
          </div>
        </div>
      </label>
    </div>
  );
}
