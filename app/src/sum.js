export default (array, getter) => array.map(getter).reduce((a, b) => a + b, 0);
