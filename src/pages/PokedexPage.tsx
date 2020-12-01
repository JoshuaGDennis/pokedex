import React, { useRef, useState } from "react";
import { animated, useSpring, config } from 'react-spring'

const PokedexPage: React.FC = () => {
  const [ loaded, setLoaded ] = useState(false)

  const cardRef = useRef()

  const { size, ...rest } = useSpring({
    ref: cardRef,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: { size: loaded ? '100%' : '20%', background: loaded ? 'white' : 'hotpink' }
  })

  return (
    <animated.div style={{ ...rest, width: size, height: size }} onClick={() => setLoaded(s => !s)}>
      STUFF
    </animated.div>
  )
};

export default PokedexPage;
