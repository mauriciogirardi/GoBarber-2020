import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'android' ? 24 : getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity`
  position: relative;
`;

export const IconUserAvatarProfile = styled(Icons)`
  position: absolute;
  bottom: 0;
  right: -5px;
  color: #ff9000;
  font-size: 20px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #f4ede8;
  font-size: 28px;
  margin-bottom: 24px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)`
  background-color: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProvaderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProvaderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 18px;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const ProviderMetaText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #999591;
  font-size: 14px;
  margin-left: 8px;
`;
