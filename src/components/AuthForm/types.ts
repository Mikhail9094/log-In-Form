export interface IAuthFormProps {
  className?: string;
  onSubmit?: () => void;
}

export interface IFormData {
  email: string;
  password: string;
}

export interface IStatus {
  error: {
    status: boolean;
    message: string;
  };
  isLoading: boolean;
  success: boolean;
}
