import * as React from 'react';


interface ButtonProps {
  variant?: 'outline' | 'solid';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

//const Button = React.forwardRef<HTMLButtonElement>(

const Button: React.FC<ButtonProps> = ({ variant = 'solid', icon, children, ...props }) => {
  return (
    <div />

  );
};
Button.displayName = 'Button';

export { Button };