import React, { Component } from 'react';
import { WPEngineSite } from './WPEngineSite';

export const WPEngineSiteList = (props) => {
  return (
    <div className="limiter">
      <table cellSpacing="0">
        <thead>
            <tr>
              <th>Install Name</th>
              <th>Cname</th>
              <th>Primary Domain</th>
              <th>PHP Version</th>
            </tr>
        </thead>
        <tbody>
        {props.installs.map((install) => {
        return (
          <WPEngineSite 
            id={install.id}
            name={install.name}
            cname={install.cname}
            primary_domain={install.primary_domain}
            php_version={install.php_version}
          />
        )})}
        </tbody>
      </table>
    </div>
  );
}
