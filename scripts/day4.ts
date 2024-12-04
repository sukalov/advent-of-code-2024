const LETTERS_OFFSET = {
  M: 1,
  A: 2,
  S: 3,
};

const SM_PAIRS: { [x: string]: string } = {
  S: "M",
  M: "S",
};

const main = async () => {
  const data = await Bun.file("data/day4.txt").text();
  const lines = data.split("\n");
  const matrix = lines.map((line) => line.split(""));
  let XMASCounter = 0;
  let MASCrossCounter = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === "X") {
        const directionsInitial: [x: number, y: number][] = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];
        const directions2 = checkNextLetter(
          [row, col],
          "M",
          directionsInitial,
          matrix
        );
        const directions3 = checkNextLetter(
          [row, col],
          "A",
          directions2,
          matrix
        );
        const directionsFinal = checkNextLetter(
          [row, col],
          "S",
          directions3,
          matrix
        );
        XMASCounter += directionsFinal.length;
      } else if (
        matrix[row][col] === "A" &&
        isCenterOfCross([row, col], matrix)
      ) {
        MASCrossCounter++;
      }
    }
  }
  return { XMASCounter, MASCrossCounter };
};

const checkNextLetter = (
  Xaddress: [x: number, y: number],
  letter: "M" | "A" | "S",
  directions: [x: number, y: number][],
  matrix: string[][]
) => {
  const offset = LETTERS_OFFSET[letter];
  const newDirections: [x: number, y: number][] = [];
  for (let direction of directions) {
    const newAddress = [
      Xaddress[0] + offset * direction[0],
      Xaddress[1] + offset * direction[1],
    ];
    if (
      newAddress[0] >= 0 &&
      newAddress[1] >= 0 &&
      newAddress[0] < matrix.length &&
      newAddress[1] < matrix.length &&
      matrix[newAddress[0]][newAddress[1]] === letter
    ) {
      newDirections.push(direction);
    }
  }
  return newDirections;
};

const isCenterOfCross = (
  Aaddress: [x: number, y: number],
  matrix: string[][]
) => {
  if (
    Aaddress[0] > 0 &&
    Aaddress[1] > 0 &&
    Aaddress[0] < matrix.length - 1 &&
    Aaddress[1] < matrix.length - 1
  ) {
    if (
      matrix[Aaddress[0] - 1][Aaddress[1] - 1] ===
        SM_PAIRS[matrix[Aaddress[0] + 1][Aaddress[1] + 1]] &&
      matrix[Aaddress[0] + 1][Aaddress[1] - 1] ===
        SM_PAIRS[matrix[Aaddress[0] - 1][Aaddress[1] + 1]]
    ) {
      return true;
    }
    return false;
  }
};

console.log(await main());
