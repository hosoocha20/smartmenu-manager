import React from 'react'
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

interface ToastProps{
    children?: React.ReactNode,
    key: string;
    type: string,
    header: string,
    removeToast: (id: string) => void;

}

type ToastData = {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    
  };
  
  type ToastWrapperProps = {
    toasts: ToastData[];
    removeToast: (id: string) => void; // Callback to remove toast
  };

export const ToastWrapper = (props:ToastWrapperProps) => {
    return (
        <div className='fixed right-4 bottom-4 flex flex-col gap-3'>
            {props.toasts.map((toast: ToastData) => {
                return(
                    <Toast key={toast.id} type={toast.type} header={toast.message} removeToast={props.removeToast} />
                )
            })}
        </div>
    )
}

export const Toast = (props: ToastProps) => {
  return (
    <div className={`relative font-inter flex gap-3 items-center  border rounded-md px-4 py-4 w-fit ${props.type === "success" ? "bg-[#effaf9] border-[#74d4d2]/50" : props.type === "info" ? "bg-[#f1f5ff] " : props.type === "warning" ? "bg-[#fffdf1]" : "bg-[#fff6f7]"}`}>
        <div className='absolute left-0  top-0 w-[4px] h-full bg-[#00a28c]'></div>
        <IoMdCheckmarkCircle className='text-[#00a28c] text-[1.2rem]'/>
        <h4 className={`font-semibold text-sm tracking-wide ${props.type === "success" ? "text-[#00a28c]" : props.type === "info" ? " " : props.type === "warning" ? "" : ""}`}>{props.header}</h4>
        <button className='ml-8 justify-self-end text-my-black-800' onClick={() => props.removeToast(props.key)}>
            <RxCross2 />
        </button>
    </div>
  )
}
