import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from 'utils/getValidationErrors';
import { useToast } from 'hooks/toast';
import { useAuth } from 'hooks/auth';

import api from 'services/api';

import Input from 'components/Input';
import Button from 'components/Button';

import { Container, Content, AvatarInput } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Dígite um e-mail válido.'),

          old_password: Yup.string(),

          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatóriio'),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatóriio'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          password,
          old_password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado com succeso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na Atualização do Casdastro',
          description:
            'ocorreu um erro ao fazer a atualização, tente  novamente.',
        });
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <>
      <AvatarInput>
        <Link to="/dashboard">
          <FiArrowLeft />
        </Link>
        <div>
          <img src={user.avatar} alt={user.name} />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </div>
      </AvatarInput>
      <Container>
        <Content>
          <Form
            initialData={{
              name: user.name,
              email: user.email,
            }}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <h1>Meu perfil</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              containerStyle={{ marginTop: '20px' }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha nova"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />
            <Button type="submit">Confirmar nudanças</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
