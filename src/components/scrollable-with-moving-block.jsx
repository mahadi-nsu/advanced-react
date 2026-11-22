import { useState } from 'react';
import { getPosition } from './get-position';
import { MovingBlock } from './moving-block';

const ScrollableWithMovingBlock = ({content}) => {
    const [position, setPosition] = useState(300);

    const onScroll = (e) => {
        const calculated = getPosition(e.target.scrollTop);
        setPosition(calculated);
      };

  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      {content}
    </div>
  )
}

export default ScrollableWithMovingBlock
