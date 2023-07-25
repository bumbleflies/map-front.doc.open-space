// https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
export {}
type ConfigType = {
    [hostname: string]: {
        url: string
    }
}

const config: ConfigType = {
    'localhost': {url: 'http://localhost:5000'},
    'open-space-app.servyy.duckdns.org': {url: 'https://api.open-space-app.servyy.duckdns.org'}
}

const determineEnvironment = () => {
    let location = window.location.hostname
    let locationConfig = config[location]
    console.log(`selecting ${JSON.stringify(locationConfig)} based on ${location}`)
    return locationConfig
}

const ApiServer = determineEnvironment()

export const Endpoints = {
    imageUpload: ApiServer.url + '/image-upload',
    images: ApiServer.url + '/i',
    openSpaces: ApiServer.url + '/os/'
}

