import { GridItemType } from "@/types/GridItemType"
import b7Svg from '@/svgs/b7.svg'
import {items} from '@/data/items'

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <div 
        onClick={onClick} 
        className={`${item.permanentShown || item.shown ? 'bg-[#1550FF]' : 'bg-[#E2E3E3]'} h-25 rounded-[20px] flex justify-center items-center cursor-pointer`}>
            {item.permanentShown === false && item.shown === false && 
                <img className="h-10 w-10 opacity-10"  
                src={b7Svg.src} alt=""/>
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <img  className="h-10 w-10" 
                src={items[item.item].icon.src} alt=""/>
            }
        </div>
    )
}