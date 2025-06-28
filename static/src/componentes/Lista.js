import React from "react";

const Lista = ({ times, onEditar, onExcluir }) => {
  if (!times || times.length === 0) {
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Fundação</th>
            <th>Estádio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="7" className="text-danger text-center">
              Nenhum time encontrado
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Fundação</th>
          <th>Estádio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {times.map((time) => (
          <tr key={time.idtime}>
            <td>{time.idtime}</td>
            <td>{time.nome}</td>
            <td>{time.cidade}</td>
            <td>{time.estado}</td>
            <td>{time.fundacao}</td>
            <td>{time.estadio}</td>
            <td>
              <button
                onClick={() => onEditar(time.idtime)}
                title="Editar"
                style={{ border: "none", background: "none", cursor: "pointer", marginRight: 8 }}
              >
                <img src="../imgs/edit.svg" alt="Editar" width={16} height={16} />
              </button>
              <button
                onClick={() => onExcluir(time.idtime)}
                title="Excluir"
                style={{ border: "none", background: "none", cursor: "pointer" }}
              >
                <img src="../imgs/x-square.svg" alt="Excluir" width={16} height={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Lista;
