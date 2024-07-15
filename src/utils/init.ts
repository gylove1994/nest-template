import { BehaviorSubject, filter, pipe } from 'rxjs';

const initSubject = new BehaviorSubject<string[]>([]);

class InitUtil {
  static init(key: string) {
    initSubject.next([...initSubject.value, key]);
  }
  static get init$() {
    return initSubject.asObservable();
  }
  static initPipe(needKeys: string[]) {
    return pipe(
      filter((keys: string[]) => needKeys.every((key) => keys.includes(key))),
    );
  }
}

export default InitUtil;
