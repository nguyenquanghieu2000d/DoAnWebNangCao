export function convertToVND(number) {
    return number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}