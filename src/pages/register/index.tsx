import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import InputForm from "../../componets/Input";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../service/registerUser.service";
import Button from "../../componets/Button";
import Notification from "../../componets/Notification";

export const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/;

  const validatePassword = (password: string) => {
    setPasswordValidations({
      length: password.length >= 8 && password.length <= 16,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    });
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    validatePassword(password);
    setPasswordsMatch(password === confirmPassword);
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    setPasswordsMatch(password === confirmPassword);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setNotificationVisible(false);
    try {
      if (!email || !password || !name || !confirmPassword) {
        setNotificationMessage("Preencha todos os campos.");
        setNotificationType("error");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }

      if (!emailRegex.test(email)) {
        setNotificationMessage("Formato de e-mail inválido.");
        setNotificationType("error");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }

      if (!Object.values(passwordValidations).every(Boolean)) {
        setNotificationMessage("A senha não atende todos os requisitos.");
        setNotificationType("error");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }

      if (!passwordsMatch) {
        setNotificationMessage("Senhas diferentes.");
        setNotificationType("error");
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }

      const registerData = { email, password, name };
      await RegisterUser.register(registerData);
      setNotificationMessage("Cadastro bem-sucedido! Redirecionando...");
      setNotificationType("success");
      setNotificationVisible(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setNotificationMessage(
        "E-mail já cadastrado. Tente outro endereço de e-mail."
      );
      setNotificationType("error");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-customBg relative">
      <div className="flex items-center justify-center min-h-screen relative ">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-center items-center p-8 bg-white bg-opacity-5 rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-orange-600">Criar Conta</h1>
            <p className="mt-2 text-gray-400">
              Preencha os campos para criar uma conta.
            </p>
          </div>
          <div className="w-full">
            <InputForm
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              label="Nome"
            />
            <InputForm
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              label="Email"
            />
            <div className="relative">
              <InputForm
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Digite sua senha"
                label="Senha"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-gray-400" size={18} />
                ) : (
                  <AiFillEye className="text-gray-400" size={18} />
                )}
              </button>
            </div>
            <div className="mt-2">
              <ul className="text-sm text-gray-500">
                <li
                  className={passwordValidations.length ? "text-green-500" : ""}
                >
                  {passwordValidations.length ? "✔" : "✘"} 8 a 16 caracteres
                </li>
                <li
                  className={
                    passwordValidations.uppercase ? "text-green-500" : ""
                  }
                >
                  {passwordValidations.uppercase ? "✔" : "✘"} Uma letra
                  maiúscula
                </li>
                <li
                  className={
                    passwordValidations.lowercase ? "text-green-500" : ""
                  }
                >
                  {passwordValidations.lowercase ? "✔" : "✘"} Uma letra
                  minúscula
                </li>
                <li
                  className={passwordValidations.number ? "text-green-500" : ""}
                >
                  {passwordValidations.number ? "✔" : "✘"} Um número
                </li>
                <li
                  className={
                    passwordValidations.specialChar ? "text-green-500" : ""
                  }
                >
                  {passwordValidations.specialChar ? "✔" : "✘"} Um caractere
                  especial (@$!%*?&)
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <InputForm
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                type={"email"}
              />
              {!passwordsMatch && (
                <p className="text-red-500 text-sm mt-1">
                  As senhas não coincidem.
                </p>
              )}
            </div>
            <div className="flex flex-col justify-start items-start mt-6">
              <Button
                className="mt-6 text-lg font-semibold text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                onClick={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-1">
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                  </span>
                ) : (
                  "Criar Conta"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Notification
        visible={notificationVisible}
        message={notificationMessage}
        type={notificationType}
      />
    </div>
  );
};
