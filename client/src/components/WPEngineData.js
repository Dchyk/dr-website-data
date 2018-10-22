import React from 'react';
import { WPEngineSiteList } from './WPEngineSiteList';

const WPEngineData = (props) => {
  return (
    <WPEngineSiteList installs={props.WPEngineSiteData } />
  );
}

export default WPEngineData;