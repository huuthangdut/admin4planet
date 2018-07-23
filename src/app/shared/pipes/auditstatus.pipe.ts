import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auditstatus'
})
export class AuditstatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;

    if (+value === 1) {
      return "<span class='label label-sm label-success'>Published</span>";
    } else if (+value === 2) {
      return "<span class='label label-sm label-warning'>Unpublished</span>";
    }
    return null;
  }

}
