import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gavel, UserPlus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const success = await register(formData.name, formData.email, formData.password);
      
      if (success) {
        navigate('/');
      } else {
        setErrors({
          general: 'El registro falló. Por favor, inténtalo de nuevo.',
        });
      }
    } catch (error) {
      console.error('Error de registro:', error);
      setErrors({
        general: 'Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.',
      });
    }
  };
  
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px-220px)] flex flex-col justify-center py-12 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Gavel className="h-12 w-12 text-purple-600" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Crear una nueva cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
              inicia sesión en tu cuenta existente
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {errors.general && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{errors.general}</span>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input 
                label="Nombre completo"
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              
              <Input 
                label="Correo electrónico"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Input
                label="Contraseña"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
              
              <Input
                label="Confirmar contraseña"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  Acepto los{' '}
                  <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                    Términos de Servicio
                  </a>{' '}
                  y la{' '}
                  <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                    Política de Privacidad
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
                className="flex items-center justify-center"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Crear cuenta
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5 text-[#4285F4]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22q-2.05 0-3.875-.788t-3.188-2.15-2.137-3.175T2 12q0-2.075.788-3.887t2.137-3.175 3.188-2.138T12 2q2.075 0 3.888.787t3.175 2.138 2.137 3.175T22 12q0 2.05-.787 3.875t-2.138 3.188-3.175 2.137T12 22zm0-2q3.325 0 5.663-2.337T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.337T4 12q0 3.325 2.337 5.663T12 20zm0-8q0 .825-.588 1.413T10 14q-.825 0-1.412-.588T8 12q0-.825.588-1.412T10 10q.825 0 1.413.588T12 12zm4.5 2.5q0 .2-.15.35t-.35.15q-.2 0-.35-.15t-.15-.35q0-.2.15-.35t.35-.15q.2 0 .35.15t.15.35zm-9 0q0 .2-.15.35t-.35.15q-.2 0-.35-.15T6.5 14.5q0-.2.15-.35t.35-.15q.2 0 .35.15t.15.35z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5 text-[#1877F2]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </button>
              </div>
              
              <p className="mt-6 text-xs text-center text-gray-600">
                Al registrarte, aceptas nuestros Términos, Política de Privacidad y Uso de Cookies.
                Este sitio está protegido por reCAPTCHA y se aplican la Política de Privacidad y los Términos de Servicio de Google.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;