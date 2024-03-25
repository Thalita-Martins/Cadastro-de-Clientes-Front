import React, { Component } from 'react';
import axios from 'axios';
import '../styles.css'
import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';

class CadastroCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nome: '',
            cpf: '',
            dataNascimento: '',
            ativo: true,
            contatos: [{
                id: '',
                nome: '',
                telefone: '',
                email: '',
                ativo: true
            }]
        };
    }

    Cliente = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    Contato = (event, index) => {
        const { name, value } = event.target;
        const contatos = [...this.state.contatos];
        contatos[index] = {
            ...contatos[index],
            [name]: value
        };
        this.setState({ contatos });
    }

    AddContato = () => {
        this.setState(prevState => ({
            contatos: [...prevState.contatos, {
                id: '',
                nome: '',
                telefone: '',
                email: '',
                ativo: true
            }]
        }));
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/cliente/cadastrar', this.state);
            alert('Cliente cadastrado com sucesso!');
            this.setState({
                id: '',
                nome: '',
                cpf: '',
                dataNascimento: '',
                ativo: false,
                contato: [{
                    id: '',
                    nome: '',
                    telefone: '',
                    email: '',
                    ativo: false
                }]
            });
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Erro ao cadastrar cliente.');
        }
    }

    render() {
        return (
            <div className="container mt-4">
                <h1>Cadastro de Cliente</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" className="form-control" id="nome" name="nome" value={this.state.nome} onChange={this.Cliente} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpf">CPF:</label>
                                <input type="text" className="form-control" id="cpf" name="cpf" value={this.state.cpf} onChange={this.Cliente} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                                <input type="date" className="form-control" id="dataNascimento" name="dataNascimento" value={this.state.dataNascimento} onChange={this.handleChangeCliente} />
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="ativo" name="ativo" checked={this.state.ativo} onChange={() => this.setState({ ativo: !this.state.ativo })} />
                                <label className="form-check-label" htmlFor="ativo">Ativo</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Contatos:</label>
                                {this.state.contatos.map((contato, index) => (
                                    <div key={index} className={index > 0 ? "mt-2" : ""}>
                                        <input type="text" className="form-control" name="nome" placeholder="Nome" value={contato.nome} onChange={(event) => this.Contato(event, index)} />
                                        <input type="text" className="form-control" name="telefone" placeholder="Telefone" value={contato.telefone} onChange={(event) => this.Contato(event, index)} />
                                        <input type="text" className="form-control" name="email" placeholder="E-mail" value={contato.email} onChange={(event) => this.Contato(event, index)} />
                                    </div>
                                ))}
                                <button type="button" className="btn btn-primary" onClick={this.handleAddContato}>Adicionar Contato</button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
            </div>
        );
    }
}
export default CadastroCliente;