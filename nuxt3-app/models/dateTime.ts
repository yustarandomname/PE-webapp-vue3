type TimeSegment = 'hour' | 'minute' | 'second' | 'millisecond';
type DateSegment = 'year' | 'month' | 'day' | 'date';

const doubleDigit = (num: number) => '' + (num < 10 ? '0' + num : num);

export class DateTime {
  date = new Date();

  constructor(date?: Date) {
    this.date = date ? date : new Date();
  }

  getSegment(segment: TimeSegment | DateSegment): number {
    switch (segment) {
      case 'hour':
        return this.date.getHours();
      case 'minute':
        return this.date.getMinutes();
      case 'second':
        return this.date.getSeconds();
      case 'millisecond':
        return this.date.getMilliseconds();
      case 'year':
        return this.date.getFullYear();
      case 'month':
        return this.date.getMonth() + 1;
      case 'day':
        return this.date.getDate();
      default:
        return 0;
    }
  }

  getSegments(segments: (TimeSegment | DateSegment)[]): string[] {
    return segments.map((segment) => {
      if (segment == 'year') return this.date.getFullYear().toString();
      return doubleDigit(this.getSegment(segment));
    });
  }

  // this.date: Sun Jan 30 2022 18:15:01 GMT+0100 (Central European Standard Time)
  // @Param: ['hour', 'minutes'']
  // @Return: '18:15'
  getTimeString(segments?: TimeSegment[]): string {
    if (segments) return this.getSegments(segments).join(':');
    return this.date.toTimeString();
  }

  // this.date: Sun Jan 30 2022 18:15:01 GMT+0100 (Central European Standard Time)
  // @Param: ['year', 'month'']
  // @Return: '2022-01'
  getDateString(segments?: DateSegment[]): string {
    if (segments) return this.getSegments(segments).join('-');
    return this.date.toDateString();
  }

  getDateTimeString(
    timeSegments?: TimeSegment[],
    dateSegment?: DateSegment[]
  ): string {
    if (!timeSegments && !dateSegment) this.date.toString();
    else if (!dateSegment) return this.getTimeString(timeSegments);
    else if (!timeSegments) return this.getDateString(dateSegment);

    return `${this.getDateString(dateSegment)} ${this.getTimeString(
      timeSegments
    )}`;
  }

  setDateString(dateString: string) {
    const [year, month, day] = dateString.split('-');
    if (year) this.date.setFullYear(parseInt(year));
    if (month) this.date.setMonth(parseInt(month) - 1);
    if (day) this.date.setDate(parseInt(day));
  }

  setTimeString(timeString: string) {
    const [hours, minutes, seconds, milliseconds] = timeString.split(':');
    this.setTime(
      parseInt(hours) || null,
      parseInt(minutes) || null,
      parseInt(seconds) || null,
      parseInt(milliseconds) || null
    );
  }

  setTime(
    hours: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ) {
    if (milliseconds) this.date.setHours(hours, minutes, seconds, milliseconds);
    else if (seconds) this.date.setHours(hours, minutes, seconds);
    else if (minutes) this.date.setHours(hours, minutes);
    else if (hours) this.date.setHours(hours);

    this.date = new Date(this.date);
  }
}

export class ComputedDateTime {
  date = ref<Date>(new Date());

  constructor(date?: Date) {
    this.date.value = date ? date : new Date();
  }

  getSegment(segment: TimeSegment | DateSegment): number {
    return new DateTime(this.date.value).getSegment(segment);
  }

  getSegments(segments: (TimeSegment | DateSegment)[]): string[] {
    return new DateTime(this.date.value).getSegments(segments);
  }

  getTimeString(segments?: TimeSegment[]): string {
    return new DateTime(this.date.value).getTimeString(segments);
  }

  getDateString(segments?: DateSegment[]): string {
    return new DateTime(this.date.value).getDateString(segments);
  }

  getDateTimeString(
    timeSegments?: TimeSegment[],
    dateSegment?: DateSegment[]
  ): string {
    return new DateTime(this.date.value).getDateTimeString(
      timeSegments,
      dateSegment
    );
  }

  setDateString(dateString: string) {
    const newDateTime = new DateTime(this.date.value);
    newDateTime.setDateString(dateString);
    this.date.value = new Date(newDateTime.date);
  }

  setTimeString(timeString: string) {
    const newDateTime = new DateTime(this.date.value);
    newDateTime.setTimeString(timeString);
    this.date.value = new Date(newDateTime.date);
  }

  setTime(
    hours: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ) {
    const newDateTime = new DateTime(this.date.value);
    newDateTime.setTime(hours, minutes, seconds, milliseconds);
    this.date.value = new Date(newDateTime.date);
  }
}
