import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CompletionTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'completionTime',
})
export class CompletionTimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    let time = value.split(":");

    let timeString: String[] = [];
    let timeSpan: String[] = ["hour ", "minute ", "second"]
    let timeSpan2: String[] = ["hours ", "minutes ", "seconds"]

    time.forEach( (value, index) => {
      if( value == "00") {
        timeString[index] = ""
      } else {
        if(value == "01") {
          timeString[index] = "1 " + timeSpan[index]
        } else {
          if(value[0] == "0") {
            timeString[index] = value[1] + " " + timeSpan2[index]
          } else {
            timeString[index] = value + " " + timeSpan2[index]
          }
          
        }
      }
    })
    
  
    return "Complete in " + timeString[0] + timeString[1] + timeString[2];
  }
}
