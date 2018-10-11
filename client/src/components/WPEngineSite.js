import React from 'react';

export const WPEngineSite = (props) => {
  return (
    <tr key={props.id}>
      <td>{props.name}</td>
      <td>{props.cname}</td>
      <td>{props.primary_domain}</td>
      <td>{props.php_version}</td>
    </tr>
  );
}