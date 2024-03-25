import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ListaClientes from '../components/ListarCadastroClientes';
import CadastroCliente from '../components/CadastroCliente';

const Rotas = () => {
    const path = window.location.pathname;

    return (
        <Router>
            <div>

                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <button className={`btn btn-primary btn-block ${path === '/listar' ? 'active' : ''}`}>
                                <Link to="/listar" className="text-white text-decoration-none">Lista de Clientes</Link>
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className={`btn btn-primary btn-block ${path === '/cadastro' ? 'active' : ''}`}>
                                <Link to="/cadastro" className="text-white text-decoration-none">Cadastrar Cliente</Link>
                            </button>
                        </div>
                    </div>
                    <Routes>
                        <Route exact path="/listar" element={<ListaClientes />} />
                        <Route path="/cadastro" element={<CadastroCliente />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default Rotas;