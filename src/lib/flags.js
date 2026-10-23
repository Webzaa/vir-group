/** Unverified data renders (flagged) in development and previews, and is removed in production. */
export const SHOW_UNVERIFIED = import.meta.env.VITE_SHOW_UNVERIFIED === 'true' || !import.meta.env.PROD;
