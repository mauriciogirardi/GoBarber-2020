import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackground from 'assets/sign-in-background.png';

const appearFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
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

  animation: ${appearFromLeft} 0.9s;

  form {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 60px 0;
    width: 340px;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  a {
    align-items: center;
    color: #ff9000;
    display: flex;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 8px;
      font-size: 20px;
    }
  }
`;

export const Background = styled.div`
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
  flex: 1;
`;
