import React, { useState, useEffect } from 'react';

const Modal = ({ time, onSalvar, onCancelar }) => {
  const [formData, setFormData] = useState({
    idtime: '',
    nome: '',
    cidade: '',
    estado: '',
    fundacao: '',
    estadio: ''
  });

  useEffect(() => {
    if (time) {
      setFormData({
        idtime: time.idtime || '',
        nome: time.nome || '',
        cidade: time.cidade || '',
        estado: time.estado || '',
        fundacao: time.fundacao || '',
        estadio: time.estadio || ''
      });
    } else {
      setFormData({
        idtime: '',
        nome: '',
        cidade: '',
        estado: '',
        fundacao: '',
        estadio: ''
      });
    }
  }, [time]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cadastro de Time</h5>
            <button type="button" className="btn-close" onClick={onCancelar} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form id="formcadastro" onSubmit={handleSubmit}>
              <input type="hidden" id="idtime" name="idtime" value={formData.idtime} />
              
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label text-start d-block">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="cidade" className="form-label text-start d-block">Cidade</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="estado" className="form-label text-start d-block">Estado</label>
                    <input
                      type="text"
                      className="form-control"
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="fundacao" className="form-label text-start d-block">Fundação</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fundacao"
                      name="fundacao"
                      value={formData.fundacao}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="estadio" className="form-label text-start d-block">Estádio</label>
                    <input
                      type="text"
                      className="form-control"
                      id="estadio"
                      name="estadio"
                      value={formData.estadio}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
