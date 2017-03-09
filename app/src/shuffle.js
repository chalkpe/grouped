export default array => array.map(x => [Math.random(), x]).sort().map(x => x[1]);
