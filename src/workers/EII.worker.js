self.onmessage = (e) => {
  const version = e.data.version;
  const result = {
    message: `You're using ELECTRE ${version}`,
  };
  self.postMessage(result);
};
