import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { API_List } from 'helpers/types'
import { PokedexCard } from 'components/Card'
import VisibleElement from 'components/VisibleElement';

interface iProps {
    loadID: number
    maximumItems: number
    onCardLoad(): void
    onEndVisible(): void
    items: API_List
}

const PokedexLoader: React.FC<iProps> = ({ loadID, maximumItems, onCardLoad, onEndVisible, items }) => (
    <>
        <Row>
            {items.map((item, i) => (
                <Col xs={12} sm={6} md={4} key={item.id}>
                    <PokedexCard
                        id={item.name}
                        startLoad={loadID === i}
                        onLoaded={onCardLoad}
                    />
                </Col>
            ))}
        </Row>
        <Row>
            <Col>
                {loadID === maximumItems && (
                    <VisibleElement onVisible={onEndVisible} />
                )}
            </Col>
        </Row>
    </>
)

export default PokedexLoader