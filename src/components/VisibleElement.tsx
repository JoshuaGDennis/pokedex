import React, { useRef } from 'react'
import useVisibility from 'helpers/useVisibility'

interface iProps {
    onVisible?(): any
    className?: string
    once?: boolean
    children?: React.ReactNode
}

const VisibilityElement: React.FC<iProps> = ({ onVisible = () => {}, className, once, children }) => {
    const ref = useRef<HTMLDivElement>(null)

    useVisibility(ref, {fn: onVisible, once})

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

export default VisibilityElement