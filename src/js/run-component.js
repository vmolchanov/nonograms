export const runComponent = (data, callback) => {
    if (data === null || data?.length === 0) {
        return;
    }
    callback(data);
};