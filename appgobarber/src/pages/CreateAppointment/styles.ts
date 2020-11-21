import { FlatList, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Provider } from '../Dashboard';

interface ProviderProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'android' ? 24 : getStatusBarHeight() + 24}px;
  background: #28262e;
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  flex: 1;
  color: #f5ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

// eslint-disable-next-line prettier/prettier
export const ProviderContainer = styled(RectButton) <ProviderProps>`
  flex-direction: row;
  align-items: center;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  background-color: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  padding: 8px 16px;
  margin-right: 16px;
`;

export const ProviderAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 8px;
`;

export const ProviderName = styled.Text<ProviderProps>`
  color: ${props => (props.selected ? '#232129' : '#f5ede8')};
  font-family: 'RobotoSlab-Medium';
  font-size: 17px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  color: #f5ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 25px;
  margin: 0 24px 24px;
`;

export const OpenDatePackier = styled(RectButton)`
  height: 46px;
  background-color: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePackierText = styled.Text`
  color: #232129;
  font-family: 'RobotoSlab-Medium';
  font-size: 17px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton) <HourProps>`
  padding: 12px;
  background-color: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 46px;
  background-color: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  color: #232129;
  font-family: 'RobotoSlab-Medium';
  font-size: 17px;
`;
