type UseBrowserLocationProps = {
    locationSuccess: PositionCallback
}
export const useBrowserLocation = ({locationSuccess}: UseBrowserLocationProps) => {

    const centerCurrentLocation = () => {
        navigator.permissions.query({name: 'geolocation'}).then(permissionStatus => {
            if (permissionStatus.state === 'denied') {
                alert('Location access is disabled. Check your browser settings if you want to re-enable it');
            } else {
                navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
            }
        });
    }

    const locationError = (positionError: GeolocationPositionError) => {
        console.log(JSON.stringify(positionError))
    }

    return centerCurrentLocation

}
export default useBrowserLocation