import _ from 'lodash'
export const isArrayEqual = function (x, y) {
    let isLengthEqual = x.length === y.length
    return isLengthEqual ? _(x).differenceWith(y, _.isEqual).isEmpty() : false;
};

export function downloadCsv(csvStr, filename) {
    let str = `data:text/csv;charset=utf-8,${csvStr}`
    var encodedUri = encodeURI(str);
    var a = document.createElement('a')
    a.href = encodedUri
    a.setAttribute('download', `${filename}.csv`)
    a.click()
}