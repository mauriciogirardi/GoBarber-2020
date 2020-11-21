import React from 'react';
import { useTransition } from 'react-spring';

import { IToastMessage } from 'hooks/toast';
import { Container } from './styles';
import Toast from './Toast';

interface IToastConatinerProps {
  messages: IToastMessage[];
}

const ToastContainer: React.FC<IToastConatinerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} toast={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
