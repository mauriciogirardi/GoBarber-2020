import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 30px;
`;

export const BackButton = styled(RectButton)`
  position: absolute;
  left: -70px;
  top: 10px;
`;

export const ImagemContainer = styled.View`
  position: relative;
`;

export const ImageAvatar = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;

export const ButtonAvatar = styled(RectButton)`
  background-color: #ff9000;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 10px;
`;

export const Title = styled.Text`
  margin: 20px 0;
  color: #f4ede8;
  font-size: 22px;
  font-family: 'RobotoSlab-Medium';
  align-self: flex-start;
`;
