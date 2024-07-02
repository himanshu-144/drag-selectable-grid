import React, { useEffect, useState } from "react";

const Grid = ({ rows, cols }) => {
  
  const[isMouseDown, setIsMouseDown] = useState(false);
  const[selectedBoxes, setSelectedBoxes] = useState([]);

  const handleMouseDown=(index)=>{
    setIsMouseDown(true);
    setSelectedBoxes([index]);
  };
  const handleMouseEnter=(index)=>{
    if(isMouseDown){
            const startBox = selectedBoxes[0];
            const endBox = index;

            const startRow = Math.floor((startBox-1) / cols);
            const startCol = (startBox-1) % cols;
            const endRow =  Math.floor((endBox-1) / cols);
            const endCol = (endBox -1) % cols;
            
            const minRow = Math.min(startRow,endRow);
            const maxRow = Math.max(startRow, endRow);
            const minCol = Math.min(startCol, endCol);
            const maxCol = Math.max(startCol, endCol);

        const selected = [];

        for(let i=minRow;i<=maxRow;i++){
            for(let j=minCol;j<=maxCol;j++){
                selected.push(i * cols + j + 1)
                console.log(i*cols + j + 1);
            }
        }
        setSelectedBoxes(selected); // indxing
        
    }
  };
  const handleMouseLeave=()=>{
    setIsMouseDown(false);
  };


  return (
    <div className="grid" style={{ "--rows": rows, "--cols": cols }}
     onMouseLeave={handleMouseLeave}
     
    >
      {[...Array(rows * cols)].map((_, i) => {
        return <div key={i+1} className={`box ${selectedBoxes.includes(i+1) ?  "selected" : " "} `}
      
        onMouseDown={()=>handleMouseDown(i+1)}
        onMouseEnter={()=>handleMouseEnter(i+1)}
        >
           {i+1}
        </div>;
      })}
    </div>
  );
};

export default Grid;
