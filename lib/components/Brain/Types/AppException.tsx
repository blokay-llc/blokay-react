import { useRef } from "react";
import { Icon, Modal } from "../../../components/DS/Index";

function ShowError({ type, message, fullDescription }: any) {
  return (
    <div>
      <div className="bl-text-2xl bl-font-bold bl-uppercase bl-mb-3">
        {type}
      </div>
      <div className="text-red-500">{message}</div>
      {fullDescription && (
        <div className="bl-font-light bl-text-stone-800 bl-bg-stone-200 bl-p-5 bl-rounded-lg bl-mt-5">
          {fullDescription}
        </div>
      )}
    </div>
  );
}

function ErrorDecide({ error }: any) {
  console.error(error);

  if (error.name == "SQL_ERROR") {
    return (
      <ShowError
        type={error.name}
        message={error.message}
        fullDescription={error.sql}
      />
    );
  }

  return <ShowError type={error?.name} message={error?.message} />;
}

export default function AppException({ data }: any) {
  const modalRef: any = useRef();

  return (
    <>
      <div
        className="bl-absolute bl-top-3 bl-left-3 bl-bg-red-600 hover:bl-bg-red-700 bl-cursor-pointer  bl-text-white bl-px-3 bl-py-1 bl-text-sm bl-rounded-lg bl-z-30 bl-flex bl-items-center bl-gap-1 bl-select-none"
        onMouseDown={(e) => {
          e.stopPropagation();
          modalRef.current.showModal();
        }}
      >
        <Icon icon="error" className="bl-size-4 bl-fill-white" />
        <div> Error</div>
      </div>

      <Modal size="lg" position="center" ref={modalRef}>
        <ErrorDecide error={data} />
      </Modal>
    </>
  );
}
