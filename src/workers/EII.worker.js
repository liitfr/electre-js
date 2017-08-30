self.onmessage = (e) => {
  // todo control data and return error if incorrect
  const inputData = e.data;
  // Dummy code : fibonacci number
  let i;
  const fib = [];
  fib[0] = 0;
  fib[1] = 1;
  for (i = 2; i <= inputData.threshold; i += 1) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }
  const response = {
    message: 'thanks for using EII',
    result: fib[inputData.threshold],
  };
  self.postMessage(response);
};
