export const getTodayTimestamp = () => {
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

export const getTimestampOfCurrentMonthStart = () => {
    let d = new Date()
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d.getTime()
}

export const getDDMMYYYYByTimestamp = (timestamp) => {
    let d = new Date(timestamp)
    let date = d.getDate()
    let month = d.getMonth() + 1
    let year = d.getFullYear()

    return `${date}/${month}/${year}`
}

export const getTimestampWithZeroHours = (timestamp) => {
    let d = new Date(timestamp)
    d.setHours(0, 0, 0, 0)
    return d.getTime()
}

export const getFirstDayTimestampOfMonthByTimestamp = (timestamp) => {
    let d = new Date(timestamp)
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d.getTime()
}

export const calculateDayDifferenceBetweenTimestamp = (timestamp1, timestamp2) => {
    var date1 = new Date(timestamp1);
    var date2 = new Date(timestamp2);

    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return dayDiff;
}
