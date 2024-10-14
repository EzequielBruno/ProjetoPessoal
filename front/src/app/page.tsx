'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter(); // Inicializa o router

  async function login(): Promise<void> {
    const emailInput = document.querySelector<HTMLInputElement>('.email');
    const senhaInput = document.querySelector<HTMLInputElement>('.senha');

    if (emailInput && senhaInput) {
      const email = emailInput.value;
      const senha = senhaInput.value;

      try {
        const response = await fetch('http://localhost:3030/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password: senha }),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Login falhou!');
        }

        const data = await response.json();
        console.log('Dados do usuário:', data);
        
        // O token é armazenado no cookie pelo backend, não é necessário armazená-lo aqui
        // localStorage.setItem('token', data.token); // Remova isso

        // Após o login bem-sucedido, redireciona para a página inicial
        router.push('/home'); // Substitua '/home' pela rota desejada
        
       


      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    } else {
      console.error('Inputs não encontrados');
    }
  }

  return (
    <div className="ContainerLogin">
      <div className="TextTitle">
        <h1>Login</h1>
      </div>
      <div className="TextBoxs">
        <input className="email" type="email" placeholder="E-mail" />
        <input className="senha" type="password" placeholder="Senha" />
      </div>
      <div className="labelTextBoxs">
        <label className="emailLabel">E-mail</label>
        <label className="senhaLabel">Senha</label>
      </div>
      <button className="BTNLogin" onClick={login}>Login</button>
    </div>
  );
}