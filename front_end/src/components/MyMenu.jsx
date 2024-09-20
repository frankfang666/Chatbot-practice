import React from 'react';
import { Menu } from 'antd';

const MyMenu = ({ models, currentModel, setModel }) => {

  const handleMenuClick = (e) => {
    setModel(e.key);
  };

  const items = models
    .map((model) => ({
      key: model.name,
      label: model.name,
    }));

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Menu onClick={handleMenuClick} style={{ width: '50%' }} collapsed={true} mode="vertical" items={[{key: 'select-model', label: `当前模型: ${currentModel}`, children: items}]} />
    </div>
  );
};

export default MyMenu;