import React from 'react';


export default React.createContext({
    token: null,
    userId: null,
    tokenExpiration: null,
    login: (dis, token, userId, tokenExpiration) => {
        dis.context.token = token
        dis.context.userId = userId},
    logout: () => {}
});