export function formatNumber(num) {
    let formattedNumber;
    if (num >= 1e9) {
        formattedNumber = (num / 1e9).toFixed(3) + 'B';
    } else if (num >= 1e6) {
        formattedNumber = (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
        formattedNumber = (num / 1e3).toFixed(1) + 'K';
    } else {
        return num.toString();
    }

    formattedNumber = formattedNumber.replace(/\.0+([BMK])$/, '$1');

    return formattedNumber;
}