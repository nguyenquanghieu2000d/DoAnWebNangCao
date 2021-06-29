export function convertToVND(number) {
    number = parseInt(number)
    return number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}