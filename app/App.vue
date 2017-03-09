<template lang="pug">
    #app
        nav.nav.has-shadow: .container
            .nav-left
                .nav-item \#{{ count }} - 표준편차 {{ groups.length ? groups.stddev : 'Unknown' }}
        section.section: .container
            .columns
                .column: #result.box(:class='groups.length ? "show" : ""')
                    .columns.is-multiline: .column.is-half(v-for='(g, index) in groups')
                        group(key='index', :showGrade='showGrade', :index='index', :group='g')
                .column.is-one-third: .box
                    .control.is-grouped
                        p.control.is-expanded: input.input(v-on:keyup.enter='addStudent', v-model='name', placeholder='이름')
                        p.control.is-expanded: input.input(v-on:keyup.enter='addStudent', v-model.number='grade', placeholder='성적')
                        a.button.is-primary(@click='addStudent') 추가
                    hr
                    p.control: label.checkbox
                        input(v-model='showGrade', type='checkbox')
                        | 학생 성적 표시하기
                    transition-group.block(name='button', tag='div')
                        student(v-for='(s, index) in students', :key='s.name', :showGrade='showGrade', :student='s', @remove='removeStudent(index)') {{ s.name }}
                    hr
                    .control.is-grouped
                        p.control.is-expanded: input.input(v-model.number='size', type='number', placeholder='한 조에 몇 명?')
                        a.button.is-primary(@click='makeGroup') 총 {{ students.length }}명 그룹 나누기
</template>

<script>
    import 'noto-sans-kr';
    import 'bulma/css/bulma.css';

    import Group from './components/Group.vue';
    import Student from './components/Student.vue';

    import 'babel-polyfill';
    import low from 'lowdb';
    import grouper from './src/grouper';

    const db = low('db');
    db.defaults({ students: [] }).write();

    export default {
        name: 'app',
        components: { Group, Student },

        data: () => ({
            size: 3, name: '', grade: '', showGrade: false,
            groups: [], students: [], count: 0, level: 20, v: 0
        }),

        created(){
            this.students = db.get('students').value();
        },

        methods: {
            addStudent(){
                let grade = this.grade;
                let name = this.name.trim();

                if(typeof grade !== 'number') return;
                if(!name || this.students.find(s => name === s.name)) return;

                this.grade = this.name = '';
                this.students.push({ name, grade });

                db.write();
            },

            removeStudent(index){
                this.students.splice(index, 1);
                db.write();
            },

            makeGroup(g){
                let v = ++this.v;
                this.count = 0;

                (g = () => {
                    this.count++;
                    if(this.v !== v) return;

                    let groups = grouper(this.students, this.size);
                    if(!this.gg || !this.gg.length || groups.stddev < this.gg.stddev) this.gg = groups;

                    if(this.gg.stddev >= this.level) return setTimeout(g, 0);

                    this.groups = this.gg.map(group => group.filter(m => m.name));
                    this.level = this.groups.stddev = this.gg.stddev;
                })();
            }
        }
    };
</script>

<style>
    * {
        font-family: 'Noto Sans Korean', sans-serif;
    }

    #app {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }

    section {
        flex: 1 0 auto;

        background-image: url('../totoro.jpg');
        background-repeat: no-repeat;
        background-position: center center;
    }

    #result {
        opacity: 0;
        transition: all 2s ease;
    }

    #result.show {
        opacity: 1;
    }
</style>
