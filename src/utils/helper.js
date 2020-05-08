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

export const isEmptyObject = (obj) => {
    return (obj instanceof Object && Object.keys(obj).length === 0);
};

export const isArray = (value) => value && Array.isArray(value);

export const formatQuery = (query,validquery) => {
    const queryEntries = Object.entries(query ?? {});
    if (queryEntries.length === 0) return {};
    // to separate options from filters
    const options = ['page', 'sort', 'limit'];
    const filtredQuery = queryEntries.reduce((prev, curr) => {
        let [key, val] = curr;
        if (key.indexOf('-') > -1) {
            const [field, filter] = key.split('-');
            if (prev.filters[field]) {
                prev.filters[field][`$${filter}`] = val;
            } else {
                prev.filters[field] = { [`$${filter}`]: val };
            }
        } else if (options.indexOf(key) > -1) {
            prev.options[key] = val;
        }
        else {
            if (key === 'id') key = '_id'
            prev.filters[key] = val;
        }
        return prev;
    }, { options: {}, filters: {} });


    return filtredQuery;
};

const input = {
    id: 'ljsdk',
    status: 'published',
    // from=>gt
    'createdat-from': '12-12-2012',
    //to => lt
    'crreatd-to': '12-12-2011',
    page: 3,
    limit: 40,
    'price-min': 15,
    'price-max': 99,
    'tag-in': ['', 'nike'],
    'title-regex': 'iphone',
};
console.log(JSON.stringify(formatQuery(input)));
