import { useState } from 'react';

import { MovingBlock } from './components/moving-block';
import { getPosition } from './components/get-position';
import { BunchOfStuff, OtherStuffAlsoComplicated } from './components/mocks';
import { VerySlowComponent } from './components/very-slow-component';
import './styles.css';

// 🔴 PROBLEM VERSION
// state (position) আর slow component গুলো একই জায়গায়।
// প্রতিবার scroll → setPosition → পুরো App re-render → VerySlowComponent আবার 500ms wait
// → scrolling ভয়ানক ল্যাগি।
export default function App() {
  const [position, setPosition] = useState(300);

  const onScroll = (e) => {
    const calculated = getPosition(e.target.scrollTop);
    setPosition(calculated);
  };

  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      <VerySlowComponent />
      <BunchOfStuff />
      <BunchOfStuff />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
}
