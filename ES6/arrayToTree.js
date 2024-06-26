const array = [
  { id: 1, name: "CEO", parent: null },
  { id: 2, name: "a", parent: 1 },
  { id: 3, name: "b ", parent: 1 },
  { id: 4, name: "c", parent: 1 },
  { id: 5, name: "d", parent: 1 },
  { id: 6, name: "e", parent: 1 },
  { id: 7, name: "f", parent: 5 },
  { id: 8, name: "g", parent: 5 },
  { id: 9, name: "h", parent: 8 },
  { id: 10, name: "i", parent: 8 },
];
// https://codesandbox.io/p/sandbox/jovial-lalande-vhmy7?file=%2Fsrc%2Findex.js

function arrayToTree(arr) {
  const root = arr[0];
  arr.splice(0, 1);

  const dfs = (root) => {
    const children = arr
      .filter((item) => item.parent === root.id)
      .map((item) => {
        item.children = dfs(item);
        return item;
      });
    return children;
  };

  root.children = dfs(root);
  return root;
}

arrayToTree(array);
