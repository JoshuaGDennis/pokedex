import * as React from 'react'
import * as Hooks from 'helpers/hooks'
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const { useSearch } = Hooks

interface iProps {
    name: string
}

const NoPokemonFoundPage: React.FC<iProps> = ({ name }) => {
    const results = useSearch(name)

    return (
        <Container className="wide">
            <h1>No Pokemon found matching {name}</h1>

            {results.length ? (
                <div>
                    <h2>Did you mean:</h2>
                    {results.map(({ name }) => (
                        <Link to={`/pokemon/${name}`}>
                            <p>{name}</p>
                        </Link>
                    ))}
                </div>
            ) : null}
            <Link to="/pokedex">
                <Button>Back to pokedex</Button>
            </Link>
        </Container>
    )
}

export default NoPokemonFoundPage