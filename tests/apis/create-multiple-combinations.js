function checkIfExist(arr1, arr2) {
    return arr2.every((val) => {
        return arr1.includes(val);
    });
}

const combinations = (arr, level, result, curr = []) => {
    for (let i = 0; i < arr.length; i++) {
        if (curr[0] === arr[i]) continue;
        let newArray = [...curr, arr[i]];
        if (level == 1) {
            newArray.sort();
            if (!result.filter((arr) => checkIfExist(arr, newArray)).length) {
                result.push(newArray);
            }
        } else {
            combinations(arr, level - 1, result, newArray);
        }
    }
};

module.exports.calculatePossibleCombinations = obj => {
    const arr = Object.keys(obj);
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        combinations(arr, i + 1, result);
    }

    return result.map(combination => {
        const objForCombination = {};
        combination.forEach(key => {
            objForCombination[key] = obj[key]
        })
        return objForCombination;
    });
}
