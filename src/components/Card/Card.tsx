import React from 'react'
import "./styles/Card.scss"
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";

interface iProps {
    to?: string
    className?: string
    children: React.ReactNode
}

interface iCardCompound {
    Body: React.FC<{children: React.ReactNode}>
    Footer: React.FC<{children: React.ReactNode}>
}

const CustomCard: React.FC<iProps> & iCardCompound  = ({ children, className, to }) => {

    const comp = (
        <Card className={className}>
            {children}
        </Card>
    )

    if(to) return (
        <Link className="card-link" to={to}>
            {comp}
        </Link>
    )

    return comp
}

CustomCard.Body = Card.Body
CustomCard.Footer = Card.Footer

export default CustomCard