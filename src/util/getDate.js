const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' }); // Get month name
    const year = today.getFullYear();

    // Add ordinal suffix (st, nd, rd, th)
    const ordinal = (day % 10 === 1 && day !== 11)
        ? 'st'
        : (day % 10 === 2 && day !== 12)
            ? 'nd'
            : (day % 10 === 3 && day !== 13)
                ? 'rd'
                : 'th';


export {day, month, year, ordinal};