import {PermissionsAndroid, ToastAndroid} from 'react-native'


export const requestPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            
        ])
        console.log(granted)

        if (
            granted['PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE'] === 'denied' ||
            granted['PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE'] === 'denied'||
            granted['PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION'] === 'denied'||
            granted['PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION'] === 'denied'||
            granted['PermissionsAndroid.PERMISSIONS.READ_SMS'] === 'denied'
        ) {
            ToastAndroid.show('We cannot procees without permissions', ToastAndroid.LONG)
            requestPermission()
        }


    } catch (error) {
        console.error(error)
    }
}