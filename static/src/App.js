import React, { useState, useEffect } from 'react';
import './App.css';
import Lista from './componentes/Lista';
import Modal from './componentes/Modal';
import Confirmacao from './componentes/Confirmacao';

function App() {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeEditando, setTimeEditando] = useState(null);
  const [pesquisa, setPesquisa] = useState('');
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [timeParaExcluir, setTimeParaExcluir] = useState(null);

  const mostrarCarregamento = () => setLoading(true);
  const esconderCarregamento = () => setLoading(false);

  const listar = (pesquisar = false) => {
    mostrarCarregamento();
    let rota = "http://127.0.0.1:8080/time";
    const params = new URLSearchParams();

    if (pesquisar && pesquisa.trim()) {
      const termo = pesquisa.trim();
      params.append("nome", termo);
      params.append("cidade", termo);
      params.append("estado", termo);
      params.append("fundacao", termo);
      params.append("estadio", termo);
    }

    if ([...params].length > 0) {
      rota += "?" + params.toString();
    }

    fetch(rota)
      .then(resposta => {
        if (!resposta.ok) {
          throw new Error("Erro ao buscar times");
        }
        return resposta.json();
      })
      .then(dados => {
        setTimes(dados);
        esconderCarregamento();
      })
      .catch(erro => {
        console.error("Erro ao listar times:", erro);
        setTimes([]);
        esconderCarregamento();
      });
  };

  const novo = () => {
    setTimeEditando(null);
    setShowModal(true);
  };

  const editar = (id) => {
    mostrarCarregamento();
    fetch("http://127.0.0.1:8080/time/" + id, {
      method: "GET"
    })
      .then(resposta => {
        if (!resposta.ok) {
          throw new Error("Erro ao buscar time");
        }
        return resposta.json();
      })
      .then(dados => {
        setTimeEditando(dados);
        setShowModal(true);
        esconderCarregamento();
      })
      .catch(erro => {
        console.error("Erro ao buscar time:", erro);
        esconderCarregamento();
      });
  };

  const excluir = (id) => {
    setTimeParaExcluir(id);
    setShowConfirmacao(true);
  };

  const confirmarExclusao = () => {
    if (timeParaExcluir) {
      mostrarCarregamento();
      fetch("http://127.0.0.1:8080/time/" + timeParaExcluir, {
        method: "DELETE"
      })
        .then(resposta => {
          if (!resposta.ok) {
            throw new Error("Erro ao excluir time");
          }
          return resposta.text();
        })
        .then(() => {
          listar();
          setShowConfirmacao(false);
          setTimeParaExcluir(null);
        })
        .catch(erro => {
          console.error("Erro ao excluir time:", erro);
          esconderCarregamento();
          setShowConfirmacao(false);
          setTimeParaExcluir(null);
        });
    }
  };

  const cancelarExclusao = () => {
    setShowConfirmacao(false);
    setTimeParaExcluir(null);
  };

  const salvar = (timeData) => {
    setPesquisa('');
    const { idtime, nome, cidade, estado, fundacao, estadio } = timeData;

    if (!nome || !cidade || !estado || !fundacao || !estadio) {
      alert("Preencha todos os campos!");
      return;
    }

    const time = {
      idtime: (idtime === "" ? null : parseInt(idtime)),
      nome: (nome === "" ? null : nome),
      cidade: (cidade === "" ? null : cidade),
      estado: (estado === "" ? null : estado),
      fundacao: (fundacao === "" || isNaN(parseInt(fundacao)) ? null : parseInt(fundacao)),
      estadio: (estadio === "" ? null : estadio)
    };

    let url = "http://127.0.0.1:8080/time";
    let metodo = "POST";

    if (idtime) {
      url += "/" + idtime;
      metodo = "PUT";
    }

    mostrarCarregamento();
    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(time)
    })
      .then(resposta => {
        if (!resposta.ok) {
          throw new Error("Erro ao salvar time");
        }
        return resposta.text();
      })
      .then(() => {
        listar();
        setShowModal(false);
      })
      .catch(erro => {
        console.error("Erro ao salvar time:", erro);
        esconderCarregamento();
        });
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <div className="App">
      <header className="header-small">
        <h1>Cadastro de Times de Futebol</h1>
      </header>

      <div className="input-group mb-3">
        <button type="button" className="btn btn-primary" onClick={novo}>Novo</button>
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisa"
          aria-label="Pesquisa"
          aria-describedby="button-addon2"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={() => listar(true)}
        >
          Pesquisa
        </button>
      </div>

      <Lista
        times={times}
        onEditar={editar}
        onExcluir={excluir}
      />

      {showModal && (
        <Modal
          time={timeEditando}
          onSalvar={salvar}
          onCancelar={() => setShowModal(false)}
        />
      )}

      {showConfirmacao && (
        <Confirmacao
          mensagem="Deseja realmente excluir o time?"
          onConfirmar={confirmarExclusao}
          onCancelar={cancelarExclusao}
          visivel={showConfirmacao}
        />
      )}

      {loading && (
        <div id="loadingSpinner" className="position-fixed top-50 start-50 translate-middle">
          <div className="spinner-border text-primary" role="status">
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
