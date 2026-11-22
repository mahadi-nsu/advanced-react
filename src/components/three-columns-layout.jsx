// পুরোপুরি configuration-driven: তিন column-এ যা খুশি বসাও।
// Layout শুধু জায়গা দেয়, content-এর কোনো ধারণা রাখে না।
export const ThreeColumnsLayout = ({ leftColumn, middleColumn, rightColumn }) => {
  return (
    <div className="three-col">
      <div className="col">{leftColumn}</div>
      <div className="col">{middleColumn}</div>
      <div className="col">{rightColumn}</div>
    </div>
  );
};
