import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import ImagePiker from 'react-native-image-picker';

import getValidationErros from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  BackButton,
  ImageAvatar,
  ImagemContainer,
  ButtonAvatar,
} from './styles';

interface ProfileFormProps {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const inputOldPasswordRef = useRef<TextInput>(null);
  const inputConfirmPasswordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: ProfileFormProps) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
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

        Alert.alert('Perfil Atualizado com sucesso!');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro na atualização do perfil, tente novamente ',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePiker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar Camera',
        chooseFromLibraryButtonTitle: 'Escolher da  galeria',
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api.patch('users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data);
        });
      },
    );
  }, [user.id, updateUser]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <ImagemContainer>
              <BackButton onPress={handleGoBack}>
                <Icon name="chevron-left" size={30} color="#999591" />
              </BackButton>

              <ImageAvatar source={{ uri: user.avatar }} />
              <ButtonAvatar onPress={handleUpdateAvatar}>
                <Icon name="camera" size={20} />
              </ButtonAvatar>
            </ImagemContainer>

            <Title>Meu perfil</Title>

            <Form
              onSubmit={handleSubmit}
              ref={formRef}
              style={{ width: '100%' }}
              initialData={{ name: user.name, email: user.email }}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputEmailRef.current?.focus();
                }}
              />
              <Input
                ref={inputEmailRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputOldPasswordRef.current?.focus();
                }}
              />
              <Input
                ref={inputOldPasswordRef}
                containerStyle={{ marginTop: 16 }}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => inputPasswordRef.current?.focus()}
              />

              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => inputConfirmPasswordRef.current?.focus()}
              />

              <Input
                ref={inputConfirmPasswordRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmação da senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
