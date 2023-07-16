// https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
export {}
type ConfigType = {
    [hostname: string]: {
        url: string
    }
}

const config: ConfigType = {
    'localhost': {url: 'http://localhost:5000'},
    'open-space-app.servyy.duckdns.org': {url: 'http://api.open-space-app.servyy.duckdns.org'}
}

export const ImageServer = config[window.location.hostname]
