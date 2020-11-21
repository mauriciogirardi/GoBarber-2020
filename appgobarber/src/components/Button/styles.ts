import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background-color: #ff9000;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;
