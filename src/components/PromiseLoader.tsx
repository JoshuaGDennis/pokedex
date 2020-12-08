import React, { forwardRef, ReactElement, useCallback, useEffect, useState } from 'react'

interface iProps {
    render(items: any[]): React.ReactNode
    renderLoading?(): ReactElement<any, any>
    promises: Promise<any>[]
}

const PromiseLoader = forwardRef<any, iProps>(({ render, renderLoading, promises }, ref) => {
    const [ data, setData ] = useState<any[]>([])
    const [ isLoading, setIsLoading ] = useState(true)

    const loadPromises = useCallback(() => {
        setIsLoading(true)
        Promise.all(promises).then(data => {
            setData(data)
            setIsLoading(false)
        })
    }, [promises])

    useEffect(() => loadPromises(), [loadPromises])

    if (isLoading) return renderLoading ? renderLoading() : <p>LOADING</p>

    return <div ref={ref}>{render(data)}</div>
})

export default PromiseLoader