import React, { useRef, useState } from 'react'
import styles from 'styles/PokedexLoader.module.scss'

const PokedexLoader: React.FC = () => {
    const [ isLoading, setIsLoading ] = useState(true)

    const boxRef = useRef()
    const itemsRef = useRef()

    return <div className={styles.loader}></div>
}

export default PokedexLoader