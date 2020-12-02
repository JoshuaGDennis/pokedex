import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GenerationResponse } from 'helpers'
import PokedexCard from 'components/PokedexCard'
import VisibleElement from "components/VisibleElement";
import React, { useEffect, useRef, useState } from 'react'


interface iProps {
    gen: GenerationResponse
}

const PokedexLoader: React.FC<iProps> = ({ gen }) => {
    const lastGen = useRef(gen)

    const [ loadId, setLoadId ] = useState(0)
    const [ maximum, setMaximum ] = useState(6)
    const [ items, setItems ] = useState<{id: number, name: string}[]>([])

    useEffect(() => {
        if (lastGen.current.name !== gen.name) {
            setLoadId(0)
            setMaximum(6)
            lastGen.current = gen
        }
        setItems(gen.pokemon.slice(0, maximum))
    }, [gen, maximum])

    return (
        <>
            <Row>
                {items.map((pkm, i) => (
                    <Col key={pkm.name} xs={12} md={4}>
                        <PokedexCard
                            id={pkm.name}
                            startLoad={loadId === i}
                            loaded={() => setLoadId(s => s + 1)}
                        />
                    </Col>
                ))}
            </Row>
            <Row>
                <Col>
                    {loadId === maximum && <VisibleElement onVisible={() => setMaximum(s => s + 3)} />}
                </Col>
            </Row>
        </>
    )
}

export default PokedexLoader