import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';

const withAuth = (WrappedComponent: NextPage) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter(); // Certifique-se de chamar useRouter aqui
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const checkAuth = async () => {
        if (typeof window !== 'undefined') {
          try {
            const response = await fetch('http://localhost:3030/auth/profile', {
              method: 'GET',
              credentials: 'include',
            });

            if (response.ok) {
              setLoading(false);
            } else {
              console.log('Usuário não autenticado, redirecionando para login.');
              router.push('/'); // Redireciona para a página de login
            }
          } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            router.push('/'); // Redireciona em caso de erro
          }
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; // Ou um spinner de carregamento
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;