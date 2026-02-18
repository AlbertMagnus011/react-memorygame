"use client"
import logoImage from '@/assets/devmemory_logo.png'
import { Button } from '@/components/Button';
import { InfoItem } from '@/components/infoItem';
import RestartIcon from '@/svgs/restart.svg';
import { GridItemType } from '@/types/GridItemType';
import { useEffect, useState } from 'react';
import {items} from '@/data/items'
import { GridItem } from '@/components/GridItem';
import { formatTimeElapsed } from '@/utils/formatTimeElapsed';



const Page = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  const [finishedGame, setFinishedGame] = useState<boolean>(false);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing){
        setTimeElapsed(timeElapsed+1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if(showCount === 2){
      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2){
        if(opened[0].item === opened[1].item){
          
        let tempGrid = [...gridItems];
          for( let i in tempGrid){
            if(tempGrid[i].shown) {
              tempGrid[i].permanentShown = true;
              tempGrid[i].shown = false;
            }
          }
        setGridItems(tempGrid)
        setShowCount(0);
        }else{
        setTimeout(()=>{
        let tempGrid = [...gridItems];
          for( let i in tempGrid){
            if(tempGrid[i].shown) {
              tempGrid[i].shown = false;
            }
          }
        setGridItems(tempGrid)
        setShowCount(0);
        },1000)
        }

        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [showCount, gridItems]);

  useEffect(()=> {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
      setPlaying(false);
    }
  }, [moveCount, gridItems])


  const resetAndCreateGrid = () => {
    // passo 1 - resetar o jogo
    console.log("entrou")
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    // passo 2 - gerando o grid
    // criar um grid vazio
    let tempGrid: GridItemType[] = [];
    for(let i  = 0; i< (items.length * 2); i++ ) tempGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    
    // preenche o grid
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < items.length; i++){
        let pos = -1;
        while(pos < 0 || tempGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }
    // joga no state
    setGridItems(tempGrid);
    // passo 3 - começar o jogo
    setPlaying(true);
  }

  const handleItemClick = (index: number) => {
    if(playing && index !== null && showCount < 2 ){
      let tempGrid = [...gridItems];
      if(tempGrid[index].permanentShown === false && tempGrid[index].shown === false){
        tempGrid[index].shown = true;
        setShowCount(showCount + 1);

      }

      setGridItems(tempGrid);
    }
  }

  return (
    <div className="max-w-187.5 m-auto flex py-12 max-md:flex-col">
      <div className='flex flex-col w-auto  max-md:mb-12 max-md:items-center'>
        <div className='block'>
          <img src={logoImage.src} alt='logo' className='w-52'></img>
        </div>
        <div className='w-full my-3 max-md:flex max-md:justify-around max-md:text-center'>
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label='Movimentos' value={moveCount.toString()}/>
        </div>
        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />
      </div>
      <div className='flex-1 flex justify-end max-md:justify-center max-md:mx-5'>
        <div className='w-107.5 grid grid-cols-[repeat(4,1fr)] gap-2.5 max-md:grid-cols-[repeat(3,1fr)]'>
          {gridItems.map((item, index) => (
            <GridItem 
            key={index}
            item={item}
            onClick={() => handleItemClick(index)}/>
          ))}
        </div>
      </div>
      <div>{}</div>
    </div>
  )
}

export default Page;