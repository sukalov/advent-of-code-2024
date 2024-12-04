const isSafe = (report: number[]): boolean => {
  const increasing = new Set([1, 2, 3]);
  const decreasing = new Set([-1, -2, -3]);
  const steps = report.reduce((reducer: any, curr: number, i: number) => {
    if (i < report.length - 1) {
      const step = report[i + 1] - report[i];
      return reducer.concat(step);
    } else return reducer;
  }, []);
  const stepSet = new Set(steps);
  if (stepSet.isSubsetOf(increasing) || stepSet.isSubsetOf(decreasing)) {
    return true;
  }
  return false;
};

const main = async () => {
  const data = await Bun.file("data/day2.txt").text();
  const arr = data.split("\n");
  let safeReports = 0;
  let safeReportsExtended = 0;
  for (let i = 0; i < arr.length; i++) {
    let report = arr[i].split(" ").map((el) => Number(el));
    if (isSafe(report)) {
      safeReports++;
      safeReportsExtended++;
    } else {
      const variants: number[][] = [];
      report.forEach((_el, i) => {
        variants.push([...report.slice(0, i), ...report.slice(i + 1)]);
      });
      if (variants.find((value) => isSafe(value))) {
        safeReportsExtended++;
      }
    }
  }
  return { safeReports, safeReportsExtended };
};
console.log(await main());
