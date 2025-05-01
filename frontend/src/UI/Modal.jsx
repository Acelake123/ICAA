import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Modal({children, open }) {
const dialog = useRef();

useEffect(()=>{
  const modal = dialog.current;

  if(open){
    modal.showModal();
  }
  return () => modal.close();
})
  return createPortal(
    <dialog ref={dialog} className="modal">
        {children}
    </dialog>, document.getElementById("modal")
  );
};
