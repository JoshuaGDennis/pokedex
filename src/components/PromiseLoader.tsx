import React, { ReactElement, useCallback, useEffect, useState } from 'react'

interface iProps {
    render(items: any[]): void
    renderLoading?(): ReactElement<any, any>
    promises: Promise<any>[]
}

const PromiseLoader: React.FC<iProps> = ({ render, renderLoading, promises }) => {
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

    return <>{render(data)}</>
}

export default PromiseLoader