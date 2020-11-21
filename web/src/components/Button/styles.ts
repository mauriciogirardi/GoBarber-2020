import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  background: #ff9000;
  border-radius: 10px;
  border: 0;
  color: #312e38;
  padding: 0 16px;
  font-weight: 500;
  margin-top: 16px;
  height: 56px;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#ff9000')};
  }
`;
