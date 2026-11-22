import { Button } from './components/button';
import { BunchOfStuff, OtherStuffAlsoComplicated } from './components/mocks';
import { VerySlowComponent } from './components/very-slow-component';
import { useModalDialog } from './components/useModalDialog';
import './styles.css';

export default function App() {
  // hook এখন App-এই — state App-এ বসছে
  const { open, dialog } = useModalDialog();

  return (
    <>
      <Button onClick={open}>Open dialog</Button>
      {dialog}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
}
