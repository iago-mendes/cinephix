import getConfig from 'next/config'

const {publicRuntimeConfig: env} = getConfig()

export const adsClient = String(env.adClient)