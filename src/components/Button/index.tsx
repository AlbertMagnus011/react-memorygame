
type Props = {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label, icon, onClick} : Props) =>{
    return (
        <div onClick={onClick} className="w-50 h-12.5 cursor-pointer flex bg-[#1550FF] rounded-[10px] opacity-100 transition-all duration-300 ease-linear hover:opacity-80">
            {icon && 
                <div className="h-[inherit] flex justify-center items-center border-r border-r-[rgba(255, 255,255,0.2)] px-4">
                    <img src={icon.src} className="h-5"/>
                </div>
            }
            <div className="h-[inherit] text-white flex justify-center items-center flex-1 px-5">
                {label}
            </div>
        </div>
    )
}