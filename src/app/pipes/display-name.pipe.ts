import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'display_name'
})
export class DisplayNamePipe implements PipeTransform {

    transform(value: string, ...args: any[]): string {
        const [users] = args;
        const user = users.find(({ id }: { id: string }) => id == value);
        return user ? user.display_name : value;
    }

}
