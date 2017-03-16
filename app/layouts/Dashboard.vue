<template lang="pug">
    .box
        .control.is-grouped
            p.control.is-expanded: input.input(@keyup.enter='add', placeholder='이름', v-model.trim='name')
            p.control.is-expanded: input.input(@keyup.enter='add', placeholder='성적', v-model.number='grade')
            p.control: a.button.is-primary(@click='add') 추가
            p.control: a.button.is-primary(@click='fetch') CSV
        hr
        transition-group.block(name='student')
            student(v-for='(s, i) in students', :student='s', :show='show', :key='s.name', @remove='$emit("remove", i)')
        hr
        .control.is-grouped
            p.control.is-expanded: input.input(v-model.number='size', type='number', placeholder='한 조에 몇 명?')
            a.button.is-primary(@click='create') 총 {{ students.length }}명 그룹 나누기
</template>

<script>
    import Student from '../components/Student.vue';

    import grouper from '../src/grouper';
    import papaparse from '../src/papaparse';
    import fileDialog from 'file-dialog/file-dialog.min';

    export default {
        components: { Student },
        props: ['students', 'show'],

        data: () => ({
            size: 3, // 그룹 인원 수
            name: '', // 새로 추가할 학생 이름
            grade: '', // 새로 추가할 학생 성적
            bestStddev: 20
        }),

        methods: {
            add(){
                let { name, grade } = this;

                if(typeof grade !== 'number') return;
                if(!name || this.students.find(s => name === s.name)) return;

                this.grade = this.name = '';
                this.$emit('add', { name, grade });
            },

            fetch(){
                let importer = ([name, grade]) => ({ name, grade: parseFloat(grade) });

                fileDialog({ accept: 'text/csv' })
                    .then(([ file ]) => papaparse(file))
                    .then(({ data }) => this.$emit('import', data.map(importer)));
            },

            create(){
                this.$emit('update');
                let groups = grouper(this.students, this.size);

                if(!this.best || groups.stddev < this.best.stddev) this.best = groups;
                if(this.best.stddev >= this.bestStddev) return setTimeout(this.create.bind(this), 0);

                let v = this.best.map(g => g.filter(m => m.name));
                this.bestStddev = v.stddev = this.best.stddev;

                this.$emit('create', v);
            }
        }
    }
</script>
