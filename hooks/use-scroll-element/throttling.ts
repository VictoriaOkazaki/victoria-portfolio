export function createThrottlingFunction<ResT, ArgsT extends any[]>(
  operation: (...args: ArgsT) => ResT,
  throttlingInterval: number
): (...args: ArgsT) => ResT {
  let lastTime = 0;
  let lastResult: ResT;
  const func = (...args: ArgsT) => {
    const curTime = Date.now();
    if (curTime - lastTime < throttlingInterval) {
      return lastResult;
    }

    lastTime = curTime;
    lastResult = operation(...args);
    return lastResult;
  };
  return func;
}
