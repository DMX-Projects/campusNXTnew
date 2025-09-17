import { useAppDispatch } from '../../../store/hooks';
import { useLoginMutation } from '../../../store/api/baseApi';
import { loginStart, loginSuccess, loginFailure } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginApi, { isLoading }] = useLoginMutation();

  const login = async (username: string, password: string) => {
    try {
      dispatch(loginStart());
      const response = await loginApi({ username, password }).unwrap();
      
      if (response.success) {
        dispatch(loginSuccess(response.user));
        navigate('/dashboard');
        return { success: true };
      } else {
        dispatch(loginFailure('Invalid credentials'));
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  return { login, isLoading };
};