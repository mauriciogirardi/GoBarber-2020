import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';

import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';

import getValidationErrors from 'utils/getValidationErrors';
import api from 'services/api';

import logoImg from 'assets/logo.svg';

import { Container, Content, Background } from './styles';

interface ForgotPasswordData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loding, setLoding] = useState(false);

  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordData) => {
      try {
        setLoding(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email().required('E-mail obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // recuperação de senha
        await api.post('password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado.',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação da senha',
          description:
            'ocorreu um erro ao tentar realizar a recuperação da senha, tente novamente.',
        });
      } finally {
        setLoding(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar Senha</h1>

          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            autoComplete="off"
          />

          <Button loading={loding} type="submit">
            Recuperar
          </Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar ao login
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
