import styled, { css } from 'styled-components'

export const StyledFooter = styled.div``

export const Container = styled.div``

export const LogoText = styled.div``

export const List = styled.div``

export const ListGroup = styled.div``

export const ListTitle = styled.div`
  font-size: 16px;
  display: flex;
  font-weight: 600;

  color: black;

  margin-bottom: 12px;
`

export const ListItem = styled.div`
  font-size: 16px;
  display: flex;
  font-weight: 500;

  color: #636363;

  margin-bottom: 4px;

  &:hover {
    opacity: 0.7;
  }
`

export const Copyright = styled.div`
  font-weight: 500;
  font-size: 14px;
  margin-top: 360px;
  display: flex;

  position: absolute;
  color: ${(props) => props.theme.colors.tertiary + '90'};

  @media screen and (max-width: 800px) {
    & {
      margin-top: 0;
      bottom: 0;
      position: relative;
    }
  }
`

export const Logo = styled.div`
  width: 57px;
  height: 57px;
  background-color: black;
  border-radius: 57px;
`

export const Socials = styled.div`
  display: flex;
  margin-top: 58px;
`

export const SocialIcon = styled.a`
  width: 24px;
  height: 24px;
  margin-right: 28px;
  transition: 0.3s opacity;

  ${({ src }: { src?: any }) => css`
    background-image: url(${src});
    background-size: cover;
    background-repeat: no-repeat;

    &:hover {
      opacity: 0.7;
    }
  `};
`

export const Line = styled.div`
  max-width: 1650px;
  height: 1px;
  margin: 0 auto;
  background-color: #0000001f;
`

export const Subtitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #000000;

  display: flex;
  align-items: center;

  @media screen and (max-width: 666px) {
    .register-sub {
      text-align: center;
    }
  }
`

export const SignupForm = styled.div`
  display: flex;
  border-radius: 38px;
  transition: 0.2s box-shadow;
  box-shadow: 0 0 0px 0px transparent;

  &:focus-within {
    box-shadow: 0 0 0px 3px #7a7a7a;
  }
`

export const SignupInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  font-weight: 600;
  font-size: 15px;

  padding-left: 22px;
  padding-right: 8px;

  width: 392px;

  border: 2px solid black;
  border-radius: 28px 0 0 28px;

  line-height: 34px;

  &:placeholder {
    opacity: 0.5;
  }
`
