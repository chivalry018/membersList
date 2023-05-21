import { ENV } from './env';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';


export const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/lesson05',  
    port: process.env.PORT || 3005,
    sslport: 3006, 
};