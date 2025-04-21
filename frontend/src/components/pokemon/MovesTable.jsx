import React from 'react'
// import './MoveTable.css';

export const MovesTable = (props) => {
    const moves = props.moves;
  return (
    <>
     <div className="table-container">
      <table className="moves-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Power</th>
          </tr>
        </thead>
        <tbody>
          {moves.map((move, index) => (
            <tr key={index}>
              <td>{move.name}</td>
              <td>{move.type}</td>
              <td>{move.power}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}
