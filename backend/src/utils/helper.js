/* eslint-disable no-param-reassign */
import fs from 'fs';
import path from 'path';

export const makeDir = (currentPlace, dirName) => {
    fs.mkdir(path.join(currentPlace, dirName), (err) => {
        if (err) {
            if (err.code === 'EEXIST') return;
            // if any err else thant dir Exist
            console.log(err);
            return;
        }
        console.log('Folder Created Successfully');
    });
};

export const to = async (promise) => {
    try {
        const result = await promise;
        return { result };
    } catch (error) {
        return { error };
    }
};
