import getConfig from 'next/config';

const config = getConfig()
const publicRuntimeConfig = config && config.publicRuntimeConfig;


export const apiUrl = process.env.REACT_APP_API_URL;
export const appId = publicRuntimeConfig && publicRuntimeConfig.appId;
