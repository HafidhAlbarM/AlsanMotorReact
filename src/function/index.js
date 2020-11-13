export const currencyFormat = (num) => {
    return 'Rp. ' + num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const currentDate = () => {
    let dateObj = new Date();
    let month = dateObj.getMonth();
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let output = `${year}-${month}-${day}`;
    return output;
}