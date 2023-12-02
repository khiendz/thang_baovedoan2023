export function currencyFormat(num: string) {
    return  parseInt(num).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
 }