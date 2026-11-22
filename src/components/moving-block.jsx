export const MovingBlock = ({ position }) => {
  return (
    <div className="moving-block" style={{ top: position }}>
      I move on scroll 👋
    </div>
  );
};
