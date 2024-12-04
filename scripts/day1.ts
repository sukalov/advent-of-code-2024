const main = async () => {
  const data = await Bun.file("data/day1.txt").text();
  const arr = data.split("\n");
  let arr1 = [];
  let arr2 = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const numbers = arr[i].split("   ");
    arr1.push(Number(numbers[0]));
    arr2.push(Number(numbers[1]));
  }
  arr1.sort();
  arr2.sort();
  let difference = 0
  let similarity = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = Math.abs(arr1[i] - arr2[i]);
    difference += diff
  }
  const arr2reduced = arr2.reduce((counter: any, current: number) => {
    counter[current] = (counter[current] || 0) + 1;
    return counter;
  }, {});

  for (let i = 0; i < arr1.length - 1; i++) {
    const arr2res = arr2reduced[arr1[i]] ?? 0
    similarity += arr1[i] * arr2res
  }

  return {difference, similarity}
};
console.log(await main());
