import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background-color: #ff9000;
    border-radius: 4px;
    color: #312e38;
    padding: 8px;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    &::after {
      content: '';
      width: 15px;
      height: 15px;
      background-color: #ff9000;
      position: absolute;
      bottom: -5px;
      left: 45%;
      transform: translateX(-50%);
      transform: rotate(45deg);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
