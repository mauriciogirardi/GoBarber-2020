import styled, { css } from 'styled-components/native';
import Icons from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  background-color: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  padding: 0 16px;
  margin-bottom: 8px;
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(Icons)`
  margin-right: 10px;
`;
