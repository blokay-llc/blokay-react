import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Modal, Button } from "../DS/Index";
import Poly from "./Poly";

type EventsProps = {
  defaultform?: any;
  onExecuted?: any;
};
function EventsHandler(
  { defaultform = {}, onExecuted = null }: EventsProps,
  ref: any
) {
  const subBlockDefault: any = {
    blockId: null,
    blockKey: "",
    form: defaultform,
  };
  const [subBlock, setSubBlock] = useState(subBlockDefault);
  const [hasChanges, setHasChanges] = useState(false);

  const modalRef: any = useRef();
  const modalConfirmRef: any = useRef();

  const functions: any = {
    openBlock: ({
      blockId,
      blockKey,
      form,
    }: {
      blockId: number;
      blockKey: string;
      form: any;
    }) => {
      setSubBlock({ blockId, blockKey, form });
      modalRef.current.showModal();
    },
  };

  const closeBlock = () => {
    modalRef.current.hideModal();
    modalConfirmRef.current.hideModal();
    setHasChanges(false);
  };

  useImperativeHandle(ref, () => ({
    functions,
  }));

  const handleBlockExecuted = ({ detail }: any) => {
    const type = detail?.response?.type;

    if (!type || type == "error" || type == "message") {
      modalRef.current.hideModal();
      onExecuted && onExecuted();
    }
  };

  return (
    <>
      <Modal
        size="auto"
        position="center"
        ref={modalRef}
        bgColor="transparent"
        onConfirmClose={
          hasChanges ? () => modalConfirmRef.current.showModal() : null
        }
      >
        {(subBlock.blockKey || subBlock.blockId) && (
          <Poly
            // onChangeForm={() => {
            //   setHasChanges(true);
            // }}
            onExecuted={handleBlockExecuted}
            resource={subBlock.blockKey}
            defaultForm={subBlock.form}
          />
        )}
      </Modal>

      <Modal
        size="sm"
        position="center"
        ref={modalConfirmRef}
        footer={
          <div className="flex items-center gap-5">
            <Button
              text="No, cancel"
              onClick={() => modalConfirmRef.current.hideModal()}
              variant="secondary"
              className="w-full"
              size="md"
            />
            <Button
              text="Yes, close"
              onClick={() => closeBlock()}
              variant="primary"
              className="w-full"
              size="md"
            />
          </div>
        }
      >
        Are you sure you want to close this block?
      </Modal>
    </>
  );
}

export default forwardRef(EventsHandler);
