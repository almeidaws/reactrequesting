const partition = <V>(
  array: V[],
  predicate: (value: V) => boolean
): [V[], V[]] =>
  array.reduce(
    (acc, currentValue) =>
      predicate(currentValue)
        ? [[...acc[0], currentValue], acc[1]]
        : [acc[0], [...acc[1], currentValue]],
    [Array<V>(), Array<V>()]
  );

export default partition;
