import React, { forwardRef } from "react";

interface iProps {
  className: string;
  children: React.ReactNode;
}

const DropdownMenu = forwardRef<HTMLDivElement, iProps>(
  ({ children, className }, ref) => <div className={className}>{children}</div>
);

export default DropdownMenu;
