import React from 'react';

const context = React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => { }
})

export default context;