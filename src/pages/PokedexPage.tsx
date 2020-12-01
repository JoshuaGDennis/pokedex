import React, { useRef, useState } from "react";
import cardStyles from 'styles/card.module.scss'
import { animated, useSpring, config } from 'react-spring'

const PokedexPage: React.FC = () => {
  const [ loaded, setLoaded ] = useState(false)

  const cardRef = useRef<any>(null)

  const { size, ...rest } = useSpring({
    ref: cardRef,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: { size: loaded ? '100%' : '20%', background: loaded ? 'white' : 'hotpink' }
  })

  console.log(loaded, size)

  return (
    <animated.div ref={cardRef} className={cardStyles.card} style={{ ...rest, width: size, height: size }} onClick={() => setLoaded(s => !s)}>
      STUFF
    </animated.div>
  )
};

export default PokedexPage;
