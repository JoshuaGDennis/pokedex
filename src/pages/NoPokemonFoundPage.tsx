import * as React from 'react'
import Container from "react-bootstrap/Container";

interface iProps {
    name: string
}

const NoPokemonFoundPage: React.FC<iProps> = ({ name }) => (
    <Container className="wide">
        <h1>No Pokemon found matching {name}</h1>
    </Container>
)

export default NoPokemonFoundPage