let chunks = function(array, size) {
    let results = [];
    while (array.length) {
        results.push(array.splice(0, size));
    }
    return results;
};