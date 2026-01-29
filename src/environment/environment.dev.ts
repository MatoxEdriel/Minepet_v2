
const currenHost = window.location.hostname;
export const environments = {

    production: false,

    api: {
        baseUrl: 'http://localhost:3000/api',

        // baseUrl: 'http://192.168.200.18:3000/api',

        // baseUrl: 'http://animalpolis.lvh.me:3000/api',


        //produccion baseUrl: window.location.origin
        // baseUrl: `http://${currenHost}:3000`,
        version: 'v1'
    },

    auth: {
        loginUrl: '/auth/login',
    },



    app: {
        name: 'TechFix Front'

    }






} 