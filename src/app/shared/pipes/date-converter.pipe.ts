import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateConverter' })
export class DatePipe implements PipeTransform {
  transform(value: any) {
    const data: string = value + '';
    const dates: string[] = data.split(',');
    const date = new Date(
      parseInt(dates[0]),
      parseInt(dates[1]),
      parseInt(dates[2]),
      parseInt(dates[3]),
      parseInt(dates[4]),
      parseInt(dates[5])
    );
    return date;
  }
}
