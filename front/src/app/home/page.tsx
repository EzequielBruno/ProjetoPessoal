'use client';
import withAuth from '../components';





    const ProtectedPage = () => {

return(


<div className="html">


<h1>Logado com sucesso!</h1>

</div>

);
    }
    

    export default withAuth(ProtectedPage);
