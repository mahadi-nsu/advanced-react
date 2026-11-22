import { useState } from 'react';

import { Button } from './components/config-button';
import { ModalDialog } from './components/config-modal-dialog';
import { ThreeColumnsLayout } from './components/three-columns-layout';
import { Loading, ErrorIcon, Warning, Avatar } from './components/icons';
import './styles.css';

// 📘 Chapter 3 — Configuration concerns with elements as props
// নিচের সব উদাহরণ "elements as props" প্যাটার্নের।
export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // conditional rendering demo: এই element এখন তৈরি হচ্ছে,
  // কিন্তু render হবে শুধু dialog খুললে (নিচে ব্যাখ্যা README-তে)।
  const footer = (
    <>
      <Button appearance="primary" icon={<Loading />}>
        Save
      </Button>
      <Button>Cancel</Button>
    </>
  );

  return (
    <div className="playground">
      <h1>Chapter 3 · Elements as props</h1>

      {/* ---------- 1. Button + icon as prop + default values ---------- */}
      <section>
        <h2>1 · Button with icon (default size/color via cloneElement)</h2>
        <div className="row">
          {/* primary → icon default white; large → icon default large */}
          <Button appearance="primary" icon={<Loading />}>
            Submit
          </Button>
          <Button appearance="secondary" icon={<ErrorIcon />}>
            Delete
          </Button>
          <Button size="large" icon={<Warning />}>
            Warning
          </Button>
          <Button icon={<Avatar />}>Profile</Button>
          {/* consumer override: default color বাদ, red দেওয়া */}
          <Button appearance="secondary" icon={<ErrorIcon color="red" />}>
            Override red
          </Button>
        </div>
      </section>

      {/* ---------- 2. ModalDialog: children + footer prop ---------- */}
      <section>
        <h2>2 · ModalDialog (children = content, footer = element prop)</h2>
        <Button appearance="primary" onClick={() => setIsDialogOpen(true)}>
          Open dialog
        </Button>
        {isDialogOpen ? (
          <ModalDialog footer={footer}>
            <p>এটা content area (children)। footer prop আলাদা।</p>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </ModalDialog>
        ) : null}
      </section>

      {/* ---------- 3. ThreeColumnsLayout: fully configurable ---------- */}
      <section>
        <h2>3 · ThreeColumnsLayout (render anything)</h2>
        <ThreeColumnsLayout
          leftColumn={<div className="demo-box">Left</div>}
          middleColumn={<div className="demo-box">Middle</div>}
          rightColumn={<div className="demo-box">Right</div>}
        />
      </section>
    </div>
  );
}
