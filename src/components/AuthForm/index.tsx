import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./authForm.module.scss";
import { IAuthFormProps, IFormData, IStatus } from "./types";
import { logIn } from "./helpers";

function AuthForm({ className }: IAuthFormProps) {
  const [formData, setFormData] = useState<IFormData>({ email: "", password: "" });
  const [status, setStatus] = useState<IStatus>({
    error: {
      status: false,
      message: "",
    },
    isLoading: false,
    success: false,
  });

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus((prev) => ({ ...prev, isLoading: true }));
      await logIn(formData.email, formData.password);
      setStatus((prev) => ({
        ...prev,
        isLoading: false,
        success: true,
        error: {
          status: false,
          message: "",
        },
      }));
    } catch (error: any) {
      setStatus((prev) => ({
        ...prev,
        isLoading: false,
        error: {
          status: true,
          message: error.message,
        },
        success: false,
      }));
    }
  };

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
      <h2 className={styles.form__title}>Авторизоваться</h2>
      <div className={styles["form__wrapper-input"]}>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handelChange}
          placeholder="email"
          required
        />
        <label htmlFor="email">E-mail:</label>
      </div>
      <div className={styles["form__wrapper-input"]}>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handelChange}
          placeholder="password"
          required
        />
        <label htmlFor="password">Password:</label>
      </div>
      <div className={styles.options}>
        <label className={styles.options__checkbox}>
          <input type="checkbox" />
          <span>Запомнить меня</span>
        </label>
        <a href="#!" className={styles.options__recovery}>
          Забыли пароль?
        </a>
      </div>
      <div className={styles.form__action}>
        <button type="submit" className={styles["form__action-button"]}>
          {status.isLoading ? "Loading" : "Войти"}
        </button>
        <a href="#!" className={styles["form__action-link"]}>
          Нет аккаунта?
        </a>
      </div>
      {status.error.status && <p style={{ color: "red" }}>{status.error.message}</p>}
      {status.success && <p style={{ color: "green" }}>Вход в систему прошёл успешно!</p>}
    </form>
  );
}

export default AuthForm;
