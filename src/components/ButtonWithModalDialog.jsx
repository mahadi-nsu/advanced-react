import { Button } from './button';
import { useModalDialog } from './useModalDialog';

const ButtonWithModalDialog = () => {
  // state এখন hook-এ। এই ছোট component টাই শুধু re-render হবে,
  // App বা VerySlowComponent নয়।
  const { open, dialog } = useModalDialog();

  return (
    <>
      <Button onClick={open}>Open dialog</Button>
      {dialog}
    </>
  );
};

export default ButtonWithModalDialog;
