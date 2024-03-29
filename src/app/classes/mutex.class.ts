import { Logger } from './logger.class';
import { Timer } from './timer.class';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Mutex {
  private readonly PROMISE_TIMEOUT = environment.promiseTimeout;
  private readonly TIMEDOUT_MESSAGE = 'Request timed-out';
  private readonly RUNNING_MESSAGE = 'Request is already running';

  private _timer: Timer = new Timer('Mutex');
  private _lockSubject = new Subject<boolean>();
  private _errorSubject = new Subject<any>();
  private _lock: boolean = false;
  private _error: string | null = null;

  constructor(private timedout: boolean = true) {
    this._lockSubject.next(false);
    this._lockSubject.subscribe(next => (this._lock = next));
    this._errorSubject.subscribe(next => (this._error = next));
  }

  get error(): string | null {
    return this._error;
  }
  get lock(): boolean {
    return this._lock;
  }

  public exec(req: (...arg: Array<any>) => Promise<any>, ...arg: Array<any>): Promise<any> {
    this._errorSubject.next(null);
    this._lockSubject.next(false);

    return new Promise((resolve, reject) => {
      // promise timeout
      setTimeout(() => {
        if (!this.timedout && this._lock) {
          this._stopPromise(this.TIMEDOUT_MESSAGE);
          resolve(null);
        }
      }, this.PROMISE_TIMEOUT);

      if (!this._lock) {
        // exec request
        this._lockSubject.next(true);
        this._timer.start();
        req(...arg)
          .then(result => {
            this._stopPromise();
            resolve(result);
          })
          .catch(err => {
            this._stopPromise(err.message);
            Logger.warn(`[Mutex] request failed`, err);
            resolve(null);
          });
      } else {
        // locked
        this._errorSubject.next(this.RUNNING_MESSAGE);
        resolve(null);
      }
    });
  }

  private _stopPromise(message: string | null = null, lock: boolean = false): void {
    this._stopTimer();
    this._errorSubject.next(message);
    this._lockSubject.next(lock);
  }

  private _stopTimer(): void {
    this._timer.stop();
    Logger.log(`[Mutex] timer stopped`, this._timer.toString());
  }
}
