/** @type {import('next').NextConfig} */
const { PHASE_EXPORT, PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
    if(phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            env: {
                mongoUrlDev:
                    'mongodb+srv://nextjscourse:nextjscourse@cluster0.xobvpxp.mongodb.net/?retryWrites=true&w=majority',
                mongoDb_username: 'nextjscourse',
                mongoDb_password: 'nextjscourse',
            },
        }
    }
    return {
        reactStrictMode: true,
        env: {
            mongoUrlDev:
                'mongodb+srv://nextjscourse:nextjscourse@cluster0.xobvpxp.mongodb.net/?retryWrites=true&w=majority',
            mongoDb_username: 'nextjscourse',
            mongoDb_password: 'nextjscourse',
        },
    };
};

module.exports = nextConfig;
