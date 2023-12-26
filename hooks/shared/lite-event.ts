import { LiteAutoBind } from "./lite-auto-bind";

export interface ISubscribeLiteEvent<T> {
  on(handler: (data: T) => void): () => void;
  off(handler: (data: T) => void): void;
  once(handler: (data: T) => void): () => void;
}

export class LiteEvent<T>
  extends LiteAutoBind
  implements ISubscribeLiteEvent<T>
{
  private handlers: ((data: T) => void)[] = [];
  private onceHandlers: ((data: T) => void)[] = [];

  public on(handler: (data: T) => void): () => void {
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler);
    };
  }

  public off(handler: (data: T) => void): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
    this.onceHandlers = this.onceHandlers.filter((h) => h !== handler);
  }

  private execute(data: T, handlers: ((data: T) => void)[]) {
    handlers.forEach((h) => {
      try {
        h(data);
      } catch (err) {
        /* tslint:disable-next-line */
        console.error(err);
      }
    });
  }

  public emit(data: T) {
    this.execute(data, this.handlers);
    this.execute(data, this.onceHandlers);
    this.onceHandlers = [];
  }

  public once(handler: (data: T) => void): () => void {
    this.onceHandlers.push(handler);
    return () => {
      this.onceHandlers = this.onceHandlers.filter((h) => h !== handler);
    };
  }

  public unsubscribeAll(): void {
    this.handlers = [];
    this.onceHandlers = [];
  }
}
