<template lang="pug">
    #app(:class='bg && "totoro"')
        nav.nav.has-shadow: .container
            .nav-left
                .nav-item \#{{ count }} - 표준편차 {{ groups.length ? groups.stddev : '0' }}
            .nav-right
                a.nav-item: label.checkbox
                    input(v-model='bg', type='checkbox', @change='toggleBackground')
                    | 배경
                a.nav-item: label.checkbox
                    input(v-model='grade', type='checkbox')
                    | 성적
        section.section.container: .columns
            .column
                transition-group.columns.is-multiline(name='group')
                    group(v-for='(g, i) in groups', :key='i', :index='i', :group='g', :show='grade')
            .column.is-one-third
                dashboard(:students='students', :show='grade',
                    @add='add', @remove='remove', @import='set',
                    @create='create', @update='count++')
</template>

<script>
    import 'noto-sans-kr';
    import 'babel-polyfill';
    import 'bulma/css/bulma.css';

    import Group from './components/Group.vue';
    import Dashboard from './layouts/Dashboard.vue';

    import low from 'lowdb';

    const db = low('db');
    db.defaults({ students: [], bg: true }).write();

    export default {
        name: 'app',
        components: { Group, Dashboard },
        data: () => ({ students: [], groups: [], bg: true, grade: false, count: 0 }),

        created(){
            this.bg = db.get('bg').value();
            this.students = db.get('students').value();
        },

        methods: {
            add(student){
                if(this.students.find(s => s.name === student.name)) return;
                this.students.push(student); db.write();
            },

            remove(index){
                this.students.splice(index, 1); db.write();
            },

            set(students){
                db.set('students', this.students = students).write();
            },

            create(groups){
                this.groups = groups;
            },

            toggleBackground(){
                db.set('bg', this.bg).write();
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
        background-color: transparent !important;
    }

    .totoro {
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url('../totoro.jpg');
    }

    .group-move {
        transition: transform 1s;
    }
</style>
