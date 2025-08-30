import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string | number): string {
    if (!value) return '';

    const time = new Date(value).getTime();
    const now = Date.now();

    const secondsPast = (now - time) / 1000;

    if (secondsPast < 60) {
      return `${Math.floor(secondsPast)} seconds ago`;
    }
    if (secondsPast < 3600) {
      return `${Math.floor(secondsPast / 60)} minutes ago `;
    }
    if (secondsPast < 86400) {
      return `${Math.floor(secondsPast / 3600)} hours ago `;
    }
    if (secondsPast < 2592000) {
      return `${Math.floor(secondsPast / 86400)} days ago `;
    }
    if (secondsPast < 31104000) {
      return `${Math.floor(secondsPast / 2592000)} months ago `;
    }
    return `${Math.floor(secondsPast / 31104000)} years ago `;
  }

}
