export function createThrottlingFunction<ArgT, ResT>(
  operation: (arg: ArgT) => ResT,
  throttlingInterval: number
): (arg: ArgT) => ResT {
  let lastTime = 0;
  let lastResult: ResT;
  const func = (arg: ArgT) => {
    const curTime = Date.now();
    if (curTime - lastTime < throttlingInterval) {
      return lastResult;
    }

    lastTime = curTime;
    lastResult = operation(arg);
    return lastResult;
  };
  return func;
}
