import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;
export const Title = styled.Text`
  margin: 64px 0 24px;
  color: #f4ede8;
  font-size: 26px;
  font-family: 'RobotoSlab-Medium';
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BackToSignInText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
`;
