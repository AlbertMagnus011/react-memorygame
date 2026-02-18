
type Props = {
    label: string;
    value: string;
}

export const InfoItem = ({label, value} : Props) => {
    return (
        <div className="my-5 ">
            <div className="text-[15px] text-[#6A7D8B] ">
                {label}
            </div>
            <div className="text-4xl font-bold text-[#101C40]">
                {value}
            </div>
        </div>
    );
}