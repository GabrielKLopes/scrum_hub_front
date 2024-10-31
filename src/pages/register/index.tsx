import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineInfoCircle } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip'; 
import 'react-tooltip/dist/react-tooltip.css'; 
import Notification from '../../componets/Notification';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../service/registerUser.service';
import InputForm from '../../componets/Input';
import Button from '../../componets/Button';
import { emailRegex, PasswordValidations, validatePassword } from '../../common/consts';
import logoOrange from "../../assets/logo_orange.png";

export const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordValidations, setPasswordValidations] = useState<PasswordValidations>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    const validations = validatePassword(password);
    setPasswordValidations(validations); 
    setPasswordsMatch(password === confirmPassword);
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    setPasswordsMatch(password === confirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setNotificationVisible(false);
    try {
      if (!email || !password || !name || !confirmPassword) {
        setNotificationMessage('Preencha todos os campos.');
        setNotificationType('error');
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }
  
      if (!emailRegex.test(email)) {
        setNotificationMessage('Formato de e-mail inválido.');
        setNotificationType('error');
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }
  
      if (!Object.values(passwordValidations).every(Boolean)) {
        setNotificationMessage('A senha não atende todos os requisitos.');
        setNotificationType('error');
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }
  
      if (!passwordsMatch) {
        setNotificationMessage('Senhas diferentes.');
        setNotificationType('error');
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
        return;
      }
  
      const registerData = { email, password, name };
      await RegisterUser.register(registerData);
      setNotificationMessage('Cadastro bem-sucedido! Redirecionando...');
      setNotificationType('success');
      setNotificationVisible(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      const errorMessage = (error as Error).message;
  
      switch (errorMessage) {
        case "Email invalid":
          setNotificationMessage('E-mail inválido.');
          break;
        case "The password must be between 8 and 16 characters long, containing at least one saved letter, one lowercase letter, one number and one special character.":
          setNotificationMessage('A senha deve ter entre 8 e 16 caracteres e incluir pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.');
          break;
        case "E-mail already registered":
          setNotificationMessage('E-mail já cadastrado. Tente outro endereço de e-mail.');
          break;
        default:
          setNotificationMessage('Erro desconhecido. Tente novamente.');
          break;
      }
  
      setNotificationType('error');
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRegister(); 
    }
  };
  return (
    <div className="w-full min-h-screen bg-customBgLight3 relative">
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-center items-center p-8 bg-customBgLight2  shadow-2xl rounded-lg">
        <a href="/">
        <img
            src={logoOrange}
            alt="Logo Orange"
            className="absolute top-4 left-4 w-32 h-32"
            
          />
        </a>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-orange-700">Criar Conta</h1>
            <p className="mt-2 text-gray-700">Preencha os campos para criar uma conta.</p>
          </div>
          <div className="w-full">
            <InputForm
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              label="Nome"
              onKeyDown={handleKeyDown} 
            />
            <InputForm
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              label="Email"
              onKeyDown={handleKeyDown} 
            />
            <div className="relative">
              <InputForm
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Digite sua senha"
                label="Senha"
                onKeyDown={handleKeyDown} 
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-gray-700" size={18} />
                ) : (
                  <AiFillEye className="text-gray-700" size={18} />
                )}
              </button>

             
            </div>
            <AiOutlineInfoCircle
                data-tooltip-id="passwordInfo"
                className=" transform -translate-y-1/2 text-gray-700 cursor-pointer"
                size={18}
              />

              <Tooltip id="passwordInfo"  className="text-lg">
                <ul className="list-disc space-y-1 pl-4">
                  <li className={passwordValidations.length ? 'text-green-500' : 'text-red-500'}>
                    {passwordValidations.length ? '✔' : '✘'} 8 a 16 caracteres
                  </li>
                  <li className={passwordValidations.uppercase ? 'text-green-500' : 'text-red-500'}>
                    {passwordValidations.uppercase ? '✔' : '✘'} Uma letra maiúscula
                  </li>
                  <li className={passwordValidations.lowercase ? 'text-green-500' : 'text-red-500'}>
                    {passwordValidations.lowercase ? '✔' : '✘'} Uma letra minúscula
                  </li>
                  <li className={passwordValidations.number ? 'text-green-500' : 'text-red-500'}>
                    {passwordValidations.number ? '✔' : '✘'} Um número
                  </li>
                  <li className={passwordValidations.specialChar ? 'text-green-500' : 'text-red-500'}>
                    {passwordValidations.specialChar ? '✔' : '✘'} Um caractere especial (@$!%*?&)
                  </li>
                </ul>
              </Tooltip>
            <div className="mt-4">
              <InputForm
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                type="password"
                onKeyDown={handleKeyDown} 
              />
              {!passwordsMatch && (
                <p className="text-red-500 text-sm mt-1">As senhas não coincidem.</p>
              )}
            </div>
            <div className="flex flex-col justify-start items-start mt-6">
              <Button
                className="mt-6 text-lg font-semibold text-center bg-orange-700 text-white rounded-lg hover:bg-orange-800"
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
                  'Criar Conta'
                )}
              </Button>
            </div>
            <div className="mt-5">
              <a
                href="/"
                className="text-orange-700 hover:text-orange-700 "
              >
                Já possui conta? Entre
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
