import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  text-align: center;
  margin-top: 48px;
`;

export const Description = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin-top: 16px;
  text-align: center;
`;

export const OkButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  text-transform: uppercase;
`;

export const OkButton = styled(RectButton)`
  background-color: #ff9000;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 12px 24px;
  margin-top: 24px;
`;
