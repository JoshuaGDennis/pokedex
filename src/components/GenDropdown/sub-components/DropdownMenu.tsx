import * as React from 'react'

const { forwardRef } = React

interface iProps {
  className: string;
  children: React.ReactNode;
}

const DropdownMenu = forwardRef<HTMLDivElement, iProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>
      <p className="dropdown-menu__title">Generations</p>
      <div className="dropdown-menu__inner">{children}</div>
    </div>
  )
);

export default DropdownMenu;
