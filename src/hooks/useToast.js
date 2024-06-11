import { toast } from 'react-toastify';

const useToast = () => {
  const showToast = (message, type = 'info') => {
    toast(message, { type});
  };

  return showToast;
};

export default useToast;
