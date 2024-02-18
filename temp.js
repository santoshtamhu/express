let matched;
let todos = [
  {
    id: 1,
    title: "html",
    status: "completed",
  },
  {
    id: 2,
    title: "css",
    status: "completed",
  },
];

let inputValue = {
  id: 1,
  title: "html",
  status: "completed",
};

/* todos.forEach((e) => {
  if (inputValue.title == e) {
    matched = true;
  }
});
*/

/*
includes(): checks if an array contains a specified element and returns true if found, false otherwise.

matched = todos.includes(inputValue);
*/

// some() - checks the condition and returns a bollen value

matched = todos.some((e) => e.title == inputValue.title);

console.log(matched);
