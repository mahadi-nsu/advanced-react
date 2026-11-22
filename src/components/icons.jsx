// সব icon color + size prop নেয়, যাতে Button-এর cloneElement default গুলোর
// effect চোখে দেখা যায়।
const sizePx = { small: 16, medium: 24, large: 40 };

export const Loading = ({ color = 'black', size = 'medium' }) => {
  const px = sizePx[size] ?? sizePx.medium;
  return (
    <span
      className="icon-spinner"
      style={{
        width: px,
        height: px,
        borderColor: color,
        borderTopColor: 'transparent',
      }}
    />
  );
};

export const ErrorIcon = ({ color = 'black', size = 'medium' }) => {
  const px = sizePx[size] ?? sizePx.medium;
  return (
    <span className="icon-symbol" style={{ color, fontSize: px }}>
      ✕
    </span>
  );
};

export const Warning = ({ color = 'black', size = 'medium' }) => {
  const px = sizePx[size] ?? sizePx.medium;
  return (
    <span className="icon-symbol" style={{ color, fontSize: px }}>
      ⚠
    </span>
  );
};

export const Avatar = ({ color = 'black', size = 'medium' }) => {
  const px = sizePx[size] ?? sizePx.medium;
  return (
    <span
      className="icon-avatar"
      style={{ width: px, height: px, background: color, fontSize: px * 0.5 }}
    >
      🙂
    </span>
  );
};
