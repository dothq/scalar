import styled, { css } from "styled-components";

export const StyledFaq = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    flex-direction: column;
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-bottom: 100px;

    & > hr {
        height: 1px;
        background-color: rgba(0,0,0,0.15);
        width: calc(100% - 22px * 2);
        appearance: none;
        outline: none;
        border: none;
    }
`;

export const StyledFaqItem = styled.li`
    min-height: 56px;
    font-size: 24px;
    font-weight: 400;
    opacity: 1;
    display: flex;
    flex-direction: column;
    padding: 12px 22px;
    border-radius: 16px;
    overflow: hidden;
    user-select: none;

    &:hover {
        background-color: var(--accent-1);
        cursor: default;
    }
    
    &:active {
        background-color: var(--accent-1-darker);
    }

    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 56px;
        min-height: 56px;
    }

    & > div > span {
        user-select: none;
    }

    & > div > i {
        color: var(--colour);
        display: flex;
        width: 20px;
        height: 18px;
    }

    & > main {
        margin-top: 22px;
    }

    ${({ open }: { open: boolean }) => css`
        max-height: ${open ? "999999px" : "56px"};
        font-weight: ${open ? 600 : 400};

        & > div > i {
            transform: ${open ? `rotate(180deg)` : ``};
        }
    `};
`;

export const StyledFaqAnswer = styled.div`
    font-size: 18px;
    font-weight: 400;
    opacity: 1;
    display: flex;
    flex-direction: column;
    padding: 0px 22px;
    justify-content: center;
    transition: 0.3s max-height ease;
    max-width: 800px;
    overflow: hidden;

    & > div {
        margin: 2rem 0;
    }
`;