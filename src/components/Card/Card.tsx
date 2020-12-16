import React from 'react'
import "./styles/Card.scss"
import { useTheme } from 'helpers'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";

interface iProps {
    to?: string
    className?: string
    children: React.ReactNode
}

const CustomCard: React.FC<iProps> = ({ children, className, to }) => {
    const theme = useTheme()

    const comp = (
        <Card className={`card ${theme === 'dark' ? 'card-dark' : ''} ${className}`}>
            <Card.Body>
                {children}
            </Card.Body>
        </Card>
    )

    if(to) return (
        <Link className="car-link" to={to}>
            {comp}
        </Link>
    )

    return comp
}

export default CustomCard