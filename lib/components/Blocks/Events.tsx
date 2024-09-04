import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Modal, Button } from "../DS/Index";
import Block from "./Block";

type EventsProps = {
  onExecuted?: null | (() => void);
};
function EventsHandler({ onExecuted = null }: EventsProps, ref: any) {
  const subBlockDefault: any = {
    blockId: null,
    blockKey: "",
    form: {},
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
          <Block
            onChangeForm={() => {
              setHasChanges(true);
            }}
            block={subBlock.blockKey}
            defaultForm={subBlock.form}
            onExec={(result: any) => {
              if (
                !result.type ||
                result.type == "error" ||
                result.type == "message"
              ) {
                modalRef.current.hideModal();
                onExecuted && onExecuted();
              }
            }}
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
