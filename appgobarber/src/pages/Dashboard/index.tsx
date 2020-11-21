import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  IconUserAvatarProfile,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProvaderName,
  ProviderMeta,
  ProviderMetaText,
  ProvaderInfo,
  Title,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { user } = useAuth();

  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navidateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navidateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navidateToProfile}>
          <UserAvatar source={{ uri: user.avatar }} />
          <IconUserAvatarProfile name="settings" />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        ListHeaderComponent={<Title>Cabeleireiros</Title>}
        keyExtractor={provider => provider.id}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navidateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar }} />
            <ProvaderInfo>
              <ProvaderName>{provider.name}</ProvaderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Domingo à Sabado</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 17h</ProviderMetaText>
              </ProviderMeta>
            </ProvaderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
