// content = children (main part, nested syntax), footer = named element prop।
// ModalDialog জানে না ভেতরে কী — শুধু জায়গামতো বসায়।
export const ModalDialog = ({ children, footer }) => {
  return (
    <div className="modal-dialog">
      <div className="content">{children}</div>
      <div className="footer">{footer}</div>
    </div>
  );
};
