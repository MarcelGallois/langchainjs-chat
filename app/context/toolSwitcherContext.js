"use client"

import React, { createContext, useContext, useState } from 'react';

const ToolSwitcherContext = createContext();

export const useToolSwitcher = () => {
  const context = useContext(ToolSwitcherContext);
  if (!context) {
    throw new Error('useToolSwitcher must be used within a ToolSwitcherProvider');
  }
  return context;
};

export const ToolSwitcherProvider = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [githubRepo, setGithubRepo] = useState('');

  return (
    <ToolSwitcherContext.Provider value={{ selectedTool, setSelectedTool, githubRepo, setGithubRepo }}>
      {children}
    </ToolSwitcherContext.Provider>
  );
};
