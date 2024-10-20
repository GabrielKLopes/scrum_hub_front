import React, { useState } from "react";
import logoOrange from "../../assets/logo_orange.png";
import InputForm from "../../componets/Input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "../../componets/Button";
import { emailRegex } from "../../common/consts";
import { LoginUser } from "../../service/loginUser.service";
import { useNavigate } from "react-router-dom";
import Notification from "../../componets/Notification";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setNotificationVisible(false);
    try {
      if (!email || !password) {
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
  
      const loginData = { email, password };
      await LoginUser.login(loginData);
      setNotificationMessage("Login Realizado com sucesso");
      setNotificationType("success");
      setNotificationVisible(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
        const errorMessage = (error as Error).message;

        switch (errorMessage) {
          case "User not found":
            setNotificationMessage("Usuário inexistente. Tente novamente.");
            break;
          case "User ou password incorrect":
            setNotificationMessage("Senha incorreta. Tente novamente.");
            break;
          default:
            setNotificationMessage(errorMessage);
            break;
        }
      setNotificationType("error");
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen bg-customBg">
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-center items-center p-8 bg-white bg-opacity-5 rounded-lg">
          <img
            src={logoOrange}
            alt="Logo Orange"
            className="absolute top-4 left-4 w-32 h-32"
          />
          <div className="w-full">
            <h1 className="text-center text-4xl mb-10 font-semibold text-orange-500">
              Bem-vindo
            </h1>
            <InputForm
              type="email"
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
            <div className="flex flex-col justify-start items-start mt-6">
              <Button
                className="mt-6 text-lg font-semibold text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-1">
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                  </span>
                ) : (
                  "Entrar"
                )}
              </Button>
            </div>
            <div className="mt-5">
              <a
                href="/register"
                className="text-orange-500 hover:text-orange-700 "
              >
                Não possui conta? Registre-se
              </a>
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
