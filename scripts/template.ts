const main = async () => {
  const data = await Bun.file("data/dayX.txt").text();
  return {};
};

console.log(await main());
