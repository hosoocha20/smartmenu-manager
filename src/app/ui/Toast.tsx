import React from 'react'
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdInfo } from "react-icons/md";
import { IoMdWarning } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface ToastProps{
    children?: React.ReactNode,
    id: string;
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
                    <Toast key={toast.id} id={toast.id} type={toast.type} header={toast.message} removeToast={props.removeToast} />
                )
            })}
        </div>
    )
}

export const Toast = (props: ToastProps) => {
    const iconMap: Record<ToastProps['type'], JSX.Element> ={
        success: <IoMdCheckmarkCircle className='text-[#00a28c] text-[1.2rem]'/>,
        info: <MdInfo className='text-[#2e84ec] text-[1.2rem]'/>,
        warning: <IoMdWarning className='text-[#f6b002] text-[1.2rem]'/>,
        error: <IoMdCloseCircle className='text-[#fc4c4e] text-[1.4rem]'/>
    }
    const toastIcon = iconMap[props.type] || null
  return (
    <div className={`relative font-inter flex gap-3 items-top  border rounded-md px-4 py-4 w-[24rem] toast-animation ${props.type === "success" ? "bg-[#effaf9] border-[#74d4d2]/50" : props.type === "info" ? "bg-[#f0f4ff] border-[#2e84ec]/70" : props.type === "warning" ? "bg-[#fefcf0] border-[#f6b002]/70" : "bg-[#fef5f6] border-[#fc4c4e]/50"}`}>
        <div className={`absolute left-0  top-0 w-[4px] h-full  ${props.type === "success" ? "bg-[#00a28c] " : props.type === "info" ? "bg-[#2e84ec] " : props.type === "warning" ? "bg-[#f6b002] " : "bg-[#fc4c4e] "}`}></div>
        {toastIcon}
        <h4 className={`font-semibold text-sm tracking-wide mr-5 ${props.type === "success" ? "text-[#00a28c]" : props.type === "info" ? "text-[#2e84ec] " : props.type === "warning" ? "text-[#f6b002]" : "text-[#fc4c4e]"}`}>{props.header}</h4>
        <button className='ml-auto text-my-black-800' onClick={() => props.removeToast(props.id)}>
            <IoClose />
        </button>
    </div>
  )
}
