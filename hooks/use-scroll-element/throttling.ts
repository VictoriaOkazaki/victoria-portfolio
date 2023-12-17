export function createThrottlingFunction<ResT>(
  operation: () => ResT,
  throttlingInterval: number
): () => ResT {
  let lastTime = 0;
  let lastResult: ResT;
  const func = () => {
    const curTime = Date.now();
    if (curTime - lastTime < throttlingInterval) {
      return lastResult;
    }

    lastTime = curTime;
    lastResult = operation();
    return lastResult;
  };
  return func;
}
