import { BunchOfStuff, OtherStuffAlsoComplicated } from './components/mocks';
import { VerySlowComponent } from './components/very-slow-component';
import ScrollableWithMovingBlock from './components/scrollable-with-moving-block';
import './styles.css';

// ✅ FIXED VERSION (children as props)
// slow জিনিস ScrollableWithMovingBlock-এর ভেতরে লেখা, কিন্তু element তৈরি হচ্ছে App-এ।
// scroll-এ শুধু ScrollableWithMovingBlock re-render হয়, App নয় → slow জিনিস বাঁচে → smooth.
export default function App() {
  return (
    <ScrollableWithMovingBlock>
      <VerySlowComponent />
      <BunchOfStuff />
      <BunchOfStuff />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </ScrollableWithMovingBlock>
  );
}
