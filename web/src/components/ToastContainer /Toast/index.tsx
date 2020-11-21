import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle, FiCheck, FiInfo } from 'react-icons/fi';

import { IToastMessage, useToast } from 'hooks/toast';

import { Container } from './styles';

interface IToastProps {
  toast: IToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheck size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<IToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const time = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, [removeToast, toast.id]);

  return (
    <Container
      type={toast.type}
      hasdescription={Number(!!toast.description)}
      style={style}
    >
      {icons[toast.type || 'info']}
      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>

      <button onClick={() => removeToast(toast.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
