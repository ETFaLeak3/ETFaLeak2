export const loginWithOAuth = (provider: string): void => {
    console.log(`Redirecting to /auth/redirect/${provider}`);
    window.location.href = `/auth/redirect/${provider}`;
};
