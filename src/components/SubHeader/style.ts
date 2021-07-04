import styled from "styled-components";

export const StyledSubHeader = styled.div`
    height: 64px;
    overflow: hidden;
    background-color: var(--background-lighter);

    & > div {
        max-width: 1650px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 64px;
    }

    & h1 {
        font-size: 18px;
        font-weight: 500;
    }
`;