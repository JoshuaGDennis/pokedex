import React from 'react'
import Card from '../Card'
import "../styles/PokedexCard.scss"
import Image from 'components/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getPokemonSprite } from 'helpers'

const PokedexCard: React.FC = () => (
    <Card className="pokedex-card bg-grass">
        <Card.Body>
            <p className="pokedex-card__id">#1</p>
            <Row>
                <Col className="pokedex-card__image-col">
                    <Image src={getPokemonSprite(1)} />
                </Col>
            </Row>
        </Card.Body>
        <Card.Footer>
            <Row>
                <Col><h1 className="text-center">Bulbasuar</h1></Col>
            </Row>
            <Row>
                <Col><p className="text-center color-grass">GRASS</p></Col>
                <Col><p className="text-center color-poison">POISON</p></Col>
            </Row>
        </Card.Footer>
    </Card>
)

export default PokedexCard