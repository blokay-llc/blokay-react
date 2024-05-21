import { useState, useEffect } from "react";
import { Icon, Loader } from "../Index";
import { postMultimedia } from "../../../services/_base";

const AppFile = ({
  label,
  preview,
  classSelector,
  endpoint = "brain/uploadAsset",
  size = "md",
  onError,
  onDone,
  onChangeFiles,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [prev, setPrev] = useState("");
  const [filelist, setFileList]: any = useState([]);
  const [id] = useState((Math.random() + 1).toString(36).substring(7));

  const ext = () => {
    const file = prev || preview;
    return file ? file.split(".").pop() : null;
  };
  const previewImage = () => {
    const file = prev || preview;

    if (["png", "jpeg", "jpg", "bmp", "webp"].includes(ext())) {
      return file;
    }
    return null;
  };

  const onChange = () => {
    const el: any = document.getElementById(id);
    setFileList(el.files);
  };

  const sendFile = (pics: any[], endpoint: string) => {
    const formData = new FormData();
    formData.append("file", pics[0]);
    return postMultimedia(endpoint, formData, {
      // token: typeof window != "undefined" ? window.token_web : "",
    });
  };

  const uploadPhoto = (pics: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", pics[0]);

    return sendFile(pics, endpoint)
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
  };

  useEffect(() => {
    if (filelist.length > 0) {
      uploadPhoto(filelist);
    }
  }, [uploadPhoto, filelist]);

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
          className="bl-h-10 bl-fill-stone-800 dark:bl-fill-stone-200"
        />
      );
    } else if (["csv", "xls", "xlsx"].includes(ext())) {
      return (
        <Icon
          icon="excel"
          className="bl-h-10 bl-fill-stone-800 dark:bl-fill-stone-200"
        />
      );
    } else {
      return (
        <Icon
          icon="upload"
          className="bl-h-10 bl-fill-stone-800 dark:bl-fill-stone-200"
        />
      );
    }
  };

  return (
    <div
      className={`bl-p-2 bl-rounded-lg bl-inline-block bl-bg-stone-100 dark:bl-bg-stone-900 dark:bl-border-stone-900 dark:hover:bl-bg-black bl-border-2 bl-border-stone-200 hover:bl-bg-stone-200 bl-w-full  ${classSelector} ${size}`}
    >
      <input type="file" className="bl-hidden" id={id} onChange={onChange} />

      <label
        htmlFor={id}
        className=" bl-items-center bl-gap-3 bl-cursor-pointer bl-flex"
      >
        <div className="bl-prev">{renderImage()}</div>

        <div>
          {label ? (
            <div className="bl-text-sm bl-block bl-py-1 bl-text-stone-800 dark:bl-text-stone-100 bl-font-medium">
              {label}
            </div>
          ) : null}

          <div className="bl-text-left bl-font-light bl-text-xs bl-text-stone-600 dark:bl-text-stone-300">
            <p className="md:hidden bl-block">Click here to select a file</p>
            <p className="hidden md:bl-block">Touch here to select.</p>
          </div>
        </div>
      </label>
    </div>
  );
};

export default AppFile;
