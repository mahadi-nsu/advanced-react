import { BunchOfStuff, OtherStuffAlsoComplicated } from './components/mocks';
import { VerySlowComponent } from './components/very-slow-component';
import ScrollableWithMovingBlock from './components/scrollable-with-moving-block';
import './styles.css';

// ✅ FIXED VERSION
// App-এ কোনো state নেই। slow জিনিস এখানে বানিয়ে prop (content) দিয়ে পাঠানো হচ্ছে।
// scroll-এ শুধু ScrollableWithMovingBlock re-render হয়, App নয় → slow জিনিস বাঁচে → smooth.
export default function App() {
  const slowComponent = (
    <>
     <VerySlowComponent />
     <BunchOfStuff />
     <BunchOfStuff />
     <BunchOfStuff />
     <OtherStuffAlsoComplicated />
    </>
  )


  return (
    <ScrollableWithMovingBlock content={slowComponent} />
  );
}
