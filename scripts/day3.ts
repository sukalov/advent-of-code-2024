const main = async () => {
  const data = await Bun.file("data/day3.txt").text();
  const regex = /mul\((\d{0,3}),(\d{0,3})\)/gm;
  let multiplicationSum = 0;
  data.match(regex)?.forEach((pair) => {
    const details = /(\d*),(\d*)/.exec(pair);
    if (!details) throw new Error();
    const mul = Number(details[1]) * Number(details[2]);
    multiplicationSum += mul;
  });
  const newData = data.replace(/don't\(\).*?do\(\)/gs, "do()");
  let multiplicationSumCleaned = 0;
  newData.match(regex)?.forEach((pair) => {
    const details2 = /(\d*),(\d*)/.exec(pair);
    if (!details2) throw new Error();
    const mul = Number(details2[1]) * Number(details2[2]);
    multiplicationSumCleaned += mul;
  });
  return { multiplicationSum, multiplicationSumCleaned };
};

console.log(await main());
