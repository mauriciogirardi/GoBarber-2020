import React, { createContext, useCallback, useContext, useState } from 'react';

import api from 'services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface IAuthState {
  token: string;
  user: User;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: User;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@gobarber:token');
    const user = localStorage.getItem('@gobarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('@gobarber:token', token);
      localStorage.setItem('@gobarber:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@gobarber:token');
    localStorage.removeItem('@gobarber:user');

    setData({} as IAuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@gobarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
