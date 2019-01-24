import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

function isFunction(value) {
  return typeof value === 'function';
}

export const untilDestroyed = (
  componentInstance: any,
  destroyMethodName = 'ngOnDestroy'
) => <T>(source: Observable<T>) => {
  const origDestroyMethod = componentInstance[destroyMethodName];

  if (!isFunction(origDestroyMethod)) {
    throw new Error(
      `${
        componentInstance.constructor.name
      } is using untilDestroyed but doesn't implement ${destroyMethodName}`
    );
  }

  if (!componentInstance['__takeUntilDestroy']) {
    componentInstance['__takeUntilDestroy'] = new Subject();

    // Override the destroy method.
    componentInstance[destroyMethodName] = function() {
      // Make sure to call the original destroy method.
      isFunction(origDestroyMethod) && origDestroyMethod.apply(this, arguments);

      componentInstance['__takeUntilDestroy'].next(true);
      componentInstance['__takeUntilDestroy'].complete();
    };
  }
  
  return source.pipe(takeUntil<T>(componentInstance['__takeUntilDestroy']));
};
