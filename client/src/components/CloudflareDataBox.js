import React from 'react';

const CloudflareDataBox = (props) => {
  const zoneData = props.zoneData;

  return (
    <div className="data-box">
      <img className="icon" src="images/cloudflare-logo.png" alt="" />
      <h3>Cloudflare & DNS Info</h3>
      <table>
        <tbody>
          <tr>
            <th scope="row">Zone Name</th>
            <td>{zoneData.zoneName}</td>
          </tr>
          <tr>
            <th scope="row">Original DNS Host</th>
            <td>{zoneData.originalDNS}</td>
          </tr>
          <tr>
            <th scope="row">Cloudflare Nameserver 1</th>
            <td>{zoneData.nameServer1}</td>
          </tr>
          <tr>
            <th scope="row">Cloudflare Nameserver 2</th>
            <td>{zoneData.nameServer2}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CloudflareDataBox;