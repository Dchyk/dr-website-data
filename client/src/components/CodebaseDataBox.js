import React from 'react';

const CodebaseDataBox = (props) => {
  const codebaseData = props.codebaseData;
  

  return (
    <div className="data-box">
      <img className="icon" src="images/dr-logo.png" alt="" />
      <h3>Codebase Data</h3>

      <table>
        <tbody>
          <tr>
            <th scope="row">Codebase Version</th>
            <td>{codebaseData.codebaseVersion}</td>
          </tr>
          <tr>
            <th scope="row">DS Theme Name</th>
            <td>{codebaseData.dsName}</td>
          </tr>
          <tr>
            <th scope="row">DS Theme Version</th>
            <td>{codebaseData.dsVersion}</td>
          </tr>
          <tr>
            <th scope="row">Last Checked</th>
            <td>{codebaseData.lastCodebaseReport}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CodebaseDataBox;