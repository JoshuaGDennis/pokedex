import "./styles/Card.scss";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

interface iProps {
  to?: string;
  className?: string;
  children: React.ReactNode;
}

interface iCompounded
  extends ForwardRefExoticComponent<iProps & RefAttributes<HTMLDivElement>> {
  Body: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
}

const CustomCard = forwardRef<HTMLDivElement, iProps>(
  ({ className, children, to }, ref) => {
    const comp = (
      <Card ref={ref} className={className}>
        {children}
      </Card>
    );

    if (to)
      return (
        <Link className="card-link" to={to}>
          {comp}
        </Link>
      );

    return comp;
  }
) as iCompounded;

CustomCard.Body = Card.Body;
CustomCard.Footer = Card.Footer;

export default CustomCard;
