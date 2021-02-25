export function findUniqueItemsIn(findIn, checkWith, comparator) {
  return findIn.filter(firstItem => checkWith.findIndex(secondItem => comparator ? comparator(firstItem, secondItem) : firstItem === secondItem) === -1);
}
export function filterUniqueItems(arr, comparator) {
  return arr.filter((firstItem, index, self) => {
    return self.findIndex(secondItem => comparator ? comparator(firstItem, secondItem) : firstItem === secondItem) === index;
  });
}