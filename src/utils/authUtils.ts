

export const isAuthenticated = (): boolean => {

    const tokens = localStorage.getItem('tokens');
    return !!tokens; 
};

export const storeTokens = (tokens: any): void => {
    localStorage.setItem('tokens', JSON.stringify(tokens)); 
};

export const clearTokens = (): void => {
    localStorage.removeItem('tokens');
};
