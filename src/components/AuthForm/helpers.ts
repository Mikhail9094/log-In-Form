import { IFormData } from "./types";

export function logIn(email: string, password: string): Promise<IFormData> {
  return new Promise<IFormData>((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@mail.ru" && password === "admin") {
        resolve({ email, password });
      } else {
        reject(new Error("Неправильный E-mail или пароль"));
      }
    }, 1000);
  });
}
