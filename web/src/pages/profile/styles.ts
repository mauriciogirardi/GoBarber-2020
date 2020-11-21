import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AvatarInput = styled.header`
  background-color: #28262e;
  height: 150px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  animation: ${appearFromTop} 0.9s;

  a {
    color: #999591;
    transition: color 0.2s;
    font-size: 30px;
    display: block;
    margin-left: 20px;

    &:hover {
      color: ${shade(0.2, '#999591')};
    }
  }

  > div {
    width: 202px;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);

    img {
      border-radius: 50%;
      width: 200px;
      height: 200px;
      object-fit: cover;
    }

    label {
      background-color: #ff9000;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
      width: 60px;
      height: 60px;
      display: flex;
      transition: background-color 0.2s;
      justify-content: center;
      align-items: center;

      position: absolute;
      bottom: 0;
      right: 10px;

      input {
        display: none;
      }

      svg {
        font-size: 30px;
        color: #312e38;
      }

      &:hover {
        background-color: ${shade(0.2, '#ff9000')};
      }
    }
  }
`;

export const Container = styled.div`
  align-items: stretch;
  display: flex;
  margin-top: 150px;
  animation: ${appearFromRight} 0.9s;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  place-content: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 60px 0;
    width: 340px;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`;
