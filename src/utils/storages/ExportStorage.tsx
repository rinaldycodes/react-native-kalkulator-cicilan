import AsyncStorage from '@react-native-async-storage/async-storage';


const prefix = 'export_';


class ExportStorage {
    storeData = async (key: string, value: any) => {
        try {
            const string = JSON.stringify(value);
            await AsyncStorage.setItem(prefix + key, string);
        } catch (e) {
            console.log("Error waktu storedata di " + prefix + ": " + e)
            // saving error
        }
    };

    getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(prefix + key);
            if (value !== null) {
                const json = JSON.parse(value);
                return json;
                // value previously stored
            }
        } catch (e) {
            // error reading value
            console.log("Error waktu getData di " + prefix + ": " + e)
        }
    };

    remove = async (key: string) => {
        try {
            await AsyncStorage.removeItem(prefix + key)
        } catch (e) {
            // remove error
            console.log("Error waktu remove di " + prefix + ": " + e)
        }

        console.log('Done remove.')
    }

    removeAll = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const exportKeys = keys.filter(key => key.startsWith(prefix));
            await AsyncStorage.multiRemove(exportKeys);
            console.log('All keys removed successfully.');
        } catch (e) {
            console.log("Error waktu removeAll di " + prefix + ": " + e);
        }
    }
}

export default new ExportStorage();