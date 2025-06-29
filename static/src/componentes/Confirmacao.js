import React from 'react';
import './Confirmacao.css';

function Confirmacao({ mensagem, onConfirmar, onCancelar, visivel }) {
  if (!visivel) return null;

  return (
    <div className="confirmacao-overlay">
      <div className="confirmacao-modal">
        <div className="confirmacao-header">
          <h5>Usuário</h5>
        </div>
        <div className="confirmacao-body">
          <p>{mensagem}</p>
        </div>
        <div className="confirmacao-footer">
          <button 
            type="button" 
            className="btn btn-secondary me-2" 
            onClick={onCancelar}
          >
            Não
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={onConfirmar}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmacao; 