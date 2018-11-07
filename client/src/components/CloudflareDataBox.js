import React from 'react';

const CloudflareDataBox = (props) => {
  const siteData = props.siteData;

  return (
    <div className="data-box">
      <img className="icon" src="images/cloudflare-logo.png" alt="" />
      <h3>Cloudflare & DNS Info</h3>
      <p><span>Name:</span> {siteData.name}</p>
      <p>Original DNS Host: {siteData.original_dnshost}</p>
      <p>Cloudflare Nameserver 1: {siteData.name_servers[0]}</p>
      <p>Cloudflare Nameserver 2: {siteData.name_servers[1]}</p>
    </div>
  )
}

export default CloudflareDataBox;