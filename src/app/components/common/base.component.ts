import { ReplaySubject } from "rxjs";


export class BaseComponent  {
    protected destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    constructor() {}

    onDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}