import React from "react";
import { StyledMenu, MenuContent } from "./style";

export const About = ({ id, visible, highlighted }: { id: string; visible: boolean, highlighted: number }) => {
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => setReady(true), [ready]);

    return (
        <StyledMenu id={id} visible={highlighted === 3 && visible}>
            <MenuContent>
                bingus about
            </MenuContent>
        </StyledMenu>
    )
}