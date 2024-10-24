export const isAuthenticated = (provider: 'gmail' | 'outlook'): boolean => {
    const tokens = localStorage.getItem(`${provider}Tokens`); 
    console.log("tokens",tokens);
    return !!tokens;
};

export const storeTokens = (provider: 'gmail' | 'outlook', tokens: any): void => {
    if (provider === 'gmail') {
        localStorage.setItem('gmailTokens', JSON.stringify(tokens));
    } else if (provider === 'outlook') {
        localStorage.setItem('outlookTokens', JSON.stringify(tokens));
    }

    localStorage.setItem('authProvider', provider); 
};


export const getTokens = (provider: 'gmail' | 'outlook') => {
    const tokens = localStorage.getItem(`${provider}Tokens`);
    return tokens ? JSON.parse(tokens) : null;
};

export const clearTokens = (): void => {
    localStorage.removeItem('gmailTokens'); 
    localStorage.removeItem('outlookTokens'); 
    localStorage.removeItem('authProvider'); 
};

export const getAuthProvider = (): 'gmail' | 'outlook' | null => {
    return localStorage.getItem('authProvider') as 'gmail' | 'outlook' | null;
};
