import React from "react";
import { StyledMenu, MenuContent } from "./style";

export const Company = ({ id, visible, highlighted }: { id: string; visible: boolean, highlighted: number }) => {
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => setReady(true), [ready]);

    return (
        <StyledMenu id={id} visible={highlighted == 1 && visible}>
            <MenuContent>
                bingus company
            </MenuContent>
        </StyledMenu>
    )
}