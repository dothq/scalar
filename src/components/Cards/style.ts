import styled, { css } from "styled-components";

const SMALL_WIDTH = `calc(100% - 1045px - 52px`;
const MEDIUM_WIDTH = `calc(1045px)`;
const LARGE_WIDTH = `calc(100%)`;

export const StyledCards = styled.main`
    max-width: 1650px;
    width: 100%;
    display: flex;
    flex-flow: wrap;
    gap: 52px;
    transform: translateY(150px);
    opacity: 0;
    animation: 0.4s flyin 0.4s ease forwards;

    @keyframes flyin {
        0% {
            transform: translateY(150px);
            opacity: 0;
        }
        100% {
            transform: translateY(0px);
            opacity: 1;   
        }
    }
`;

export const StyledCard = styled.article`
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    align-items: center;

    @media only screen and (max-width: 1650px) {
        width: 100% !important;
    }

    & > h1 {
        font-weight: bold;
        font-size: 48px;
        line-height: 56px;
        color: inherit;
    }

    & > p {
        font-weight: normal;
        font-size: 24px;
        opacity: 0.75;
        max-width: 400px;
        margin: 28px auto;
        color: inherit;
    }

    & > a {
        width: max-content;
        margin-top: 100px;
        transform: scale(1.4);
        font-size: 12px;
        color: inherit;
    }

    & > *::selection {
        color: white !important;
        background-color: #7c7c7c9e !important;
    }

    ${({ size, bg, colour, center, noPadding }: { size: 's' | 'm' | 'l'; bg: any; colour?: any; center?: boolean; noPadding?: boolean }) => css`
        width: ${size === 's' ? `${center && !noPadding ? SMALL_WIDTH + ")" : `${SMALL_WIDTH} + 72px * ${center ? 2 : 4})`}` : size === 'm' ? MEDIUM_WIDTH : size === 'l' ? LARGE_WIDTH : ``};
        background: ${bg};
        background-size: cover;
        color: ${colour ? colour : `white`};

        text-align: ${center ? `center` : `left`};
        align-items: ${center ? `center` : `flex-start`};
        justify-content: ${center ? `center` : `flex-start`};

        padding: ${noPadding ? `0px` : center ? `72px 0` : `72px`};

        & > p {
            margin: ${center ? `28px auto` : `28px 0`};
        }
    `};
`;