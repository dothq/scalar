import styled, { css } from 'styled-components'

export const StyledMenu = styled.menu` 
    margin: 0;
    padding: 0;
    max-width: 1330px;
    margin: 0 auto;
    transform: translateY(-10px);
    transition: transform 0.1s, opacity 0.1s;
    transition-delay; 0s;
    opacity: 0;

    ${({ visible }: { visible: boolean }) => css`
      transform: ${visible ? `translateY(0px)` : `translateY(-10px)`};
      transition: ${visible
        ? `transform 0.3s ease, opacity 0.3s ease`
        : `transform 0.1s, opacity 0.1s`};
      transition-delay: ${visible ? `0.1s` : `0s`};
      opacity: ${visible ? 1 : 0};
      visibility: ${visible ? `visible` : `hidden`};
      height: ${visible ? `` : `0px`};
    `};
`

export const MenuContent = styled.div`
  padding: 28px;

  &:hover {
    pointer-events: all;
  }
`

export const MenuItem = styled.button`
  padding: 18px 20px;
  background-color: transparent;
  border: none;
  max-width: 442px;
  text-align: left;
  display: flex;
  flex-direction: row;
  appearance: none;
  transition: 0.15s background-color;
  border-radius: 8px;
  cursor: pointer;

  & > i {
    width: 28px;
    height: 28px;
    margin: 10px 12px;
  }

  & > div {
    width: 250px;
    padding-left: 8px;
    padding-top: 2px;
  }

  & > div > h1 {
    font-size: 18px;
    line-height: 30px;
  }

  & > div > p {
    font-size: 14px;
    color: var(--color-secondary);
  }

  &:hover {
    background-color: var(--background-color-secondary);
  }

  &:active {
    background-color: var(--btn-secondary);
  }
`
