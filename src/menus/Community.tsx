import React from 'react'
import { StyledMenu, MenuContent } from './style'

export const Community = ({
  id,
  visible,
  highlighted,
}: {
  id: string
  visible: boolean
  highlighted: number
}) => {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => setReady(true), [ready])

  return (
    <StyledMenu id={id} visible={highlighted === 2 && visible}>
      <MenuContent>bingus community</MenuContent>
    </StyledMenu>
  )
}
