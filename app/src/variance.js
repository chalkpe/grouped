import average from './average';

export default (array, getter) => {
    let avg = average(array, getter);
    return average(array.map(getter).map(i => (i - avg) ** 2), x => x);
}
