import styled, { css } from "styled-components";

export const StyledIcon = styled.i`
    ${({ icon, size, lsp, rsp }: { icon: any; size?: number, lsp?: number, rsp?: number }) => css`
        background-color: currentColor;
        mask-image: url(${icon});
        mask-size: cover;
        mask-repeat: no-repeat;

        width: ${size}px;
        height: ${size}px;
        min-width: ${size}px;
        min-height: ${size}px;
        max-width: ${size}px;
        max-height: ${size}px;

        margin-left: ${lsp}px;
        margin-right: ${rsp}px;
    `};
`;