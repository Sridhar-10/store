// Data modifier.

//================================================================

let arr = [
  { type: "animal", name: "Lion" },
  { type: "bird", name: "Eagle" },
  { type: "mobile", name: "Vivo" },
  { type: "animal", name: "Tiger" },
  { type: "bird", name: "Crow" },
  { type: "mobile", name: "Ios" },
  { type: "animal", name: "Monkey" },
  { type: "bird", name: "Dove" },
  { type: "mobile", name: "Iqoo" },
  { type: "place", name: "bangalore" },
];

function modify() {
  let modified = [];
  arr.map((el) => {
    if (modified.length === 0) {
      modified.push({
        type: el.type,
        name: [el.name],
      });
    } else {
      const exist =
        modified.length !== 0 &&
        modified.some((data) => {
          return data.type === el.type;
        });
      if (exist) {
        let number = modified.findIndex((e) => {
          return e.type === el.type;
        });
        modified[number].name = [...modified[number].name, el.name];
      } else {
        modified.push({
          type: el.type,
          name: [el.name],
        });
      }
    }
  });
  console.log(modified);
}
modify();

//output
[
  { type: "animal", name: ["Lion", "Tiger", "Monkey"] },
  { type: "bird", name: ["Eagle", "Crow", "Dove"] },
  { type: "mobile", name: ["Vivo", "Ios", "Iqoo"] },
  { type: "place", name: ["bangalore"] },
];
