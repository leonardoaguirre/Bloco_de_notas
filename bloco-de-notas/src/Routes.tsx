  
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';
import Notas from './pages/Notas';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Login} path="/" exact />
            <Route component={Cadastrar} path="/Cadastrar" />
            <Route component={Notas} path="/Notas"/>
        </BrowserRouter>
    );
}

export default Routes;