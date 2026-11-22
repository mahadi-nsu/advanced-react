import { cloneElement } from 'react';

// 🎯 Elements as props + default values (cloneElement)
// Button icon-এর shape জানে না, শুধু জায়গামতো বসায় — কিন্তু কিছু default
// (size/color) নিজে নিয়ন্ত্রণ করে, flexibility রেখেই।
export const Button = ({
  appearance = 'secondary',
  size = 'medium',
  icon,
  children = 'Submit',
  ...rest
}) => {
  // Button যে default গুলো নিয়ন্ত্রণ করতে চায়
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };

  const newProps = {
    ...defaultIconProps,
    // ⚠️ জরুরি: বাইরে থেকে দেওয়া prop যেন default-কে override করে
    ...icon?.props,
  };

  const clonedIcon = icon ? cloneElement(icon, newProps) : null;

  return (
    <button className={`cfg-button ${appearance} ${size}`} {...rest}>
      {children} {clonedIcon}
    </button>
  );
};
