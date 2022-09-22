import Router from 'vue-router';
import stores from '@/stores'
import MeetingsCalendar from '@/components/MeetingsCalendar.vue';
import Teams from '@/components/views/Teams';
// import LoginRegister from '@/components/LoginRegister';
import PageNotFound from '@/components/views/PageNotFound';
import Meetings from '@/components/views/Meetings';
import Login from '@/components/Login';
import FilterMeetings from '@/components/FilterMeeting';
import AddTeam from '@/components/AddTeam';
import AddMeeting from '@/components/AddMeeting';


const router = new Router({
    mode: 'history',
    routes: [
        {
            name:'MeetingsCalendar',
            path: '/calendar',
            component: MeetingsCalendar

        },
        {
            name: 'meeting',
            path : '/meeting',
            component : Meetings,
            children: [
                {
                    name:'addmeeting',
                    path: '/meeting/addmeeting',
                    component: AddMeeting,
                },
                {
                    name:'FilterMeeting',
                    path:'/meeting/filtermeetings',
                    component: FilterMeetings,
                },
            ]
        },
        {
            name: 'Teams',
            path: '/teams',
            component: Teams,
            children: [
                {
                    name:'addteam',
                    path: '/teams/addteam',
                    component: AddTeam,
                },
            ]
        },
        {
            name: 'Login',
            path: '/',
            component: Login
        },
        {
            name: 'PageNotFound',
            path: '*',
            component: PageNotFound
        }
    ]
});

router.beforeEach(( to, from, next ) => {
    if( to.name !== 'Login' && !stores.getters.isAuthenticated ) {
        return next({
            name: 'Login'
        });
    }
    else if(to.name=='Login' && stores.getters.isAuthenticated){
        return next({
            name: 'MeetingsCalendar'
        });
    }
    next();
});

export default router;