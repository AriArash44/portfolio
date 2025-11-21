import moment from 'moment-jalaali';

const persianMonths: { [key: string]: string } = {
    'Farvardin': 'فروردین',
    'Ordibehesht': 'اردیبهشت',
    'Khordad': 'خرداد',
    'Tir': 'تیر',
    'Amordaad': 'مرداد',
    'Shahrivar': 'شهریور',
    'Mehr': 'مهر',
    'Aabaan': 'آبان',
    'Azar': 'آذر',
    'Dey': 'دی',
    'Bahman': 'بهمن',
    'Esfand': 'اسفند'
};

export interface JalaliDate {
    year: number;
    month: number;
    monthName: string;
}

export function createGregorianDate(year: number, month: number): Date {
    return new Date(year, month);
}

export function toJalali(date: Date): JalaliDate {
    const jalaliMoment = moment(date);
    return {
        year: jalaliMoment.jYear(),
        month: jalaliMoment.jMonth(),
        monthName: jalaliMoment.format('jMMMM'),
    };
}

export function formatJalali(jalaliObj: JalaliDate, format: string = 'jYYYY/jMM'): string {
    let formatted = moment(
        `${jalaliObj.year}/${jalaliObj.month + 1}/1`, 
        'jYYYY/jMM/jDD'
    ).format(format);
    Object.entries(persianMonths).forEach(([latin, persian]) => {
        formatted = formatted.replace(latin, persian);
    });
    return formatted;
}

export function formatGregorian(date: Date, format: string = 'YYYY/MM'): string {
  return moment(date).format(format);
}

