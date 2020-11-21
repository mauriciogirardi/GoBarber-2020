import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signUpBackground from 'assets/sign-up-background.png';

const appearFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Background = styled.div`
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
  flex: 1;
`;

export const Container = styled.div`
  align-items: stretch;
  display: flex;
  height: 100vh;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  place-content: center;
  flex-direction: column;
  max-width: 700px;
  width: 100%;

  animation: ${appearFromRight} 0.9s;

  form {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 60px 0;
    width: 340px;

    h1 {
      margin-bottom: 24px;
    }
  }

  a {
    align-items: center;
    color: #f4ede8;
    display: flex;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 8px;
      font-size: 20px;
    }
  }
`;
