import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouterParams {
  date: number;
}

const AppointmentCreate: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouterParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia 'dd' de 'MMMM' de ' yyyy 'ás' HH:mm'h'",
      {
        locale: ptBR,
      },
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#84d361" />
      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreate;
