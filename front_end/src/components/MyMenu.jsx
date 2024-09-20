import React, { useState } from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const MyMenu = ({ models, setModel }) => {
  const [current, setCurrent] = useState(null);
  const filterKeywords = ['llama3', 'qwen2']; 

  const handleClick = e => {
    setCurrent(e.key);
    setModel(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <SubMenu key="models" title="选择模型">
        {models.filter(model => filterKeywords.some(keyword => model.name.includes(keyword)))
          .map(model => (
          <Menu.Item key={model.name}>{model.name}</Menu.Item>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default MyMenu;