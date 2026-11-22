import { BunchOfStuff, OtherStuffAlsoComplicated } from './components/mocks';
import { VerySlowComponent } from './components/very-slow-component';
import ButtonWithModalDialog from './components/ButtonWithModalDialog';
import './styles.css';

// ✅ SOLUTION VERSION
// state (useModalDialog hook) এখন ButtonWithModalDialog-এর ভিতরে isolate করা।
// button click → শুধু ButtonWithModalDialog re-render → App ও VerySlowComponent বাঁচে → কোনো lag নেই।
//
// 🔴 PROBLEM version (তুলনার জন্য) — hook সরাসরি App-এ ছিল:
//   const { open, dialog } = useModalDialog();  // state App-এ → পুরো App re-render
//   ... <Button onClick={open}>...  {dialog}  <VerySlowComponent /> ...
// বিস্তারিত README-তে।
export default function App() {
  return (
    <>
      <ButtonWithModalDialog />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
}
