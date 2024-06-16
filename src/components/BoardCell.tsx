import { Cell } from "../Tetris";

interface BoardCellProps {
  cellValue: Cell;
  position: [number, number];
}

const BoardCell = ({ cellValue, position }: BoardCellProps) => {
  const [row, col] = position;
  const blankCellBackground =
    ((row % 2) + (col % 2)) % 2 ? "#151515" : "#101010";
  const cellDynamicStyles: React.CSSProperties = {
    background: cellValue || blankCellBackground.toString(),
    borderWidth: cellValue ? 8 : 0,
    borderStyle: "outset",
    borderColor: `rgb(from ${cellValue} calc(.8*r) calc(.8*g) calc(.8*b))`
  };
  return <div className={` w-[9%]`} style={cellDynamicStyles}></div>;
};

export default BoardCell;
