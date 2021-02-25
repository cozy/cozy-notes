import Ranks from '../plugins/rank';
export function sortByOrder(item) {
  return function (a, b) {
    return Ranks[item].indexOf(a.name) - Ranks[item].indexOf(b.name);
  };
}