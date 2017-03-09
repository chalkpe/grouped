import sum from './sum';
import shuffle from './shuffle';
import variance from './variance';

export default (students, size) => {
    let array = students.slice();

    let mod = students.length % size;
    if(mod) for(let i = mod; i < size; i++) array.push({ name: null, grade: 0 });

    array = shuffle(array);

    let result = [];
    let length = students.length / size;

    for(let i = 0; i < length; i++) result.push(array.splice(0, size));
    result.stddev = Math.sqrt(variance(result, group => sum(group, m => m.grade)));

    return result;
}
