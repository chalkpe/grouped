<template lang="pug">
    .box
        .control.is-grouped
            p.control.is-expanded: input.input(@keyup.enter='addStudent', placeholder='이름', v-model.trim='name')
            p.control.is-expanded: input.input(@keyup.enter='addStudent', placeholder='성적', v-model.number='grade')
            p.control: a.button.is-primary(@click='addStudent') 추가
            p.control: a.button.is-primary(@click='importFile') CSV
        hr
        transition-group.block(name='button', tag='div')
            student(v-for='(s, index) in students', :student='s', :key='s.name', :show='show', @remove='removeStudent(index)')
        hr
        .control.is-grouped
            p.control.is-expanded: input.input(v-model.number='size', type='number', placeholder='한 조에 몇 명?')
            a.button.is-primary(@click='makeGroup') 총 {{ students.length }}명 그룹 나누기
</template>

<script>
    import Student from '../components/Student.vue';

    import papaparse from '../src/papaparse';
    import fileDialog from 'file-dialog/file-dialog.min';

    export default {
        props: ['students', 'show'],
        components: { Student },

        data: () => ({
            size: 3, // 그룹 인원 수
            name: '', // 새로 추가할 학생 이름
            grade: '' // 새로 추가할 학생 성적
        }),

        methods: {
            addStudent(){
                let { name, grade } = this;

                if(typeof grade !== 'number') return;
                if(!name || this.students.find(s => name === s.name)) return;

                this.grade = this.name = '';
                this.$emit('add', { name, grade });
            },

            removeStudent(index){
                this.$emit('remove', index);
            },

            importFile(){
                let importer = ([name, grade]) => ({ name, grade: parseFloat(grade) });

                fileDialog({ accept: 'text/csv' })
                    .then(([ file ]) => papaparse(file))
                    .then(({ data }) => this.$emit('import', data.map(importer)));
            },

            makeGroup(){
                this.$emit('start', this.size);
            }
        }
    }
</script>
