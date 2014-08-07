define(function() {
  /**
   * Чистит массив, удаляя из него дублирующиеся числа
   *
   * @param {Array} set
   * @param {Number} sum
   * @returns {Array}
   */
  var clearSet = function (set, sum) {
    if(!Array.isArray(set)){
      throw new Error('Wrong parameter');
    }
    var result = [],
        i = 0;

    for (var i = 0; i < set.length; i++) {
      if (result.indexOf(set[i]) === -1) {
        result.push(set[i]);
      }
    };
    return result;
  }

  /**
   * Результирующая функция.
   *  Фильтрует исходный массив,
   *  рекурсивно ищет в нем подмножества с подходящей суммой.
   *
   * @param {Array} set Исходный массив
   * @param {Number} sum Нужная сумма
   * @return {Array} Все сочетания
   */
  var getSubsets = function (set, sum) {
    var items = clearSet(set, sum),
        results = [],
        i = 0, j = 0, k = 0,
        n = set.length,
        currentItem,
        subResults;

    for (; i < n; i++) {
      currentItem = items[i]; // Текущее значение
      if (currentItem === sum) {
        results.push([currentItem]);
        continue;
      }
      // Ищем другие варианты, исключая текущее значение
      subResults = getSubsets(items.slice(i + 1), sum - currentItem);
      if (!subResults.length) continue;

      for (j = 0, k = subResults.length; j < k; j++)
        results.push([currentItem].concat(subResults[j]));
    };

    return results;
  }

  return {
    clearSet: clearSet,
    getSubset: getSubsets
  };
});
