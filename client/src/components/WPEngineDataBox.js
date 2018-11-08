import React from 'react';

const WPEngineDataBox = (props) => {
  const installData = props.installData;

  return (
    <div className="data-box">
      <img className="icon" src="images/wp-engine-logo-75.png" alt="" />
      <h3>WPEngine</h3>

      <table>
        <tbody>
          <tr>
            <th scope="row">Install Name</th>
            <td>{installData.installName}</td>
          </tr>
          <tr>
            <th scope="row">Primary Domain</th>
            <td>{installData.primaryDomain || 'Set Domain in WPEngine'}</td>
          </tr>
          <tr>
            <th scope="row">Cname</th>
            <td>{installData.cname}</td>
          </tr>
          <tr>
            <th scope="row">PHP Version</th>
            <td>{installData.phpVersion}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WPEngineDataBox;