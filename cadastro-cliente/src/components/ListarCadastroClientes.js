import React, { Component } from 'react';
import axios from 'axios';
import '../styles.css'

class ListaClientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientes: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/cliente/listar')
            .then(response => {
                this.setState({ clientes: response.data });
            })
            .catch(error => {
                console.error('Erro ao listar clientes:', error);
            });
    }

    render() {
        return (
            <div className="container mt-4">
                <h1>Lista de Clientes</h1>
                <ul className="list-group">
                    {this.state.clientes.map(cliente => (
                        <li key={cliente.id} className="list-group-item">
                            <strong>{cliente.nome}</strong> - CPF: {cliente.cpf} <br />
                            <strong>Contatos:</strong>
                            <ul>
                                {cliente.contatos.map(contato => (
                                    <li key={contato.id}>
                                        Nome: {contato.nome} - Telefone: {contato.telefone} - Email: {contato.email}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ListaClientes;