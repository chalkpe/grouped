<template lang="pug">
    #app
        nav.nav.has-shadow: .container
            .nav-left
                .nav-item \#{{ count }} - 표준편차 {{ groups.length ? groups.stddev : '0' }}
            .nav-right
                a.nav-item: label.checkbox
                    input(v-model='totoro', type='checkbox', @change='toggleTotoro')
                    | 배경
                a.nav-item: label.checkbox
                    input(v-model='grade', type='checkbox')
                    | 성적
        section.section(:class='totoro ? "totoro" : ""'): .container
            .columns
                .column
                    transition-group.columns.is-multiline(name='result-group')
                        group(v-for='(g, index) in groups', :key='index', :index='index', :group='g', :show='grade')
                .column.is-one-third
                    dashboard(:students='students', :show='grade', @add='addStudent', @remove='removeStudent', @start='makeGroup')
</template>

<script>
    import 'noto-sans-kr';
    import 'babel-polyfill';
    import 'bulma/css/bulma.css';

    import Group from './components/Group.vue';
    import Dashboard from './layouts/Dashboard.vue';

    import low from 'lowdb';
    import grouper from './src/grouper';

    const db = low('db');
    db.defaults({ students: [], totoro: true }).write();

    export default {
        name: 'app',
        components: { Group, Dashboard },

        data: () => ({
            groups: [], students: [],
            count: 0, level: 20, v: 0,
            totoro: true, grade: false
        }),

        created(){
            this.totoro = db.get('totoro').value();
            this.students = db.get('students').value();
        },

        methods: {
            addStudent(student){
                if(this.students.find(s => s.name === student.name)) return;

                this.students.push(student);
                db.write();
            },

            removeStudent(index){
                this.students.splice(index, 1);
                db.write();
            },

            makeGroup(size){
                this.count = 0;
                let g, v = ++this.v;

                (g = () => {
                    this.count++;
                    if(this.v !== v) return;

                    let groups = grouper(this.students, size);
                    if(!this.gg || !this.gg.length || groups.stddev < this.gg.stddev) this.gg = groups;

                    if(this.gg.stddev >= this.level) return setTimeout(g, 0);

                    this.groups = this.gg.map(group => group.filter(m => m.name));
                    this.level = this.groups.stddev = this.gg.stddev;
                })();
            },

            toggleTotoro(){
                db.set('totoro', this.totoro).write();
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
    }

    section.totoro {
        background-image: url('../totoro.jpg');
        background-repeat: no-repeat;
        background-position: center center;
    }

    .result-group-move {
        transition: transform 1s;
    }
</style>
