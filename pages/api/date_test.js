import dayjs from 'dayjs'

// example method using dayjs library that displays current time
const currentDate = dayjs();
const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDate);

export default function handler(req, res) {
    res.status(200).send(formattedDate)
  }