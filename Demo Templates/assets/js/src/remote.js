/**
 * remote
 * @return JSON/HTML
 * Module for fetching remote content through ajax.
 */

import axios from 'axios';

export default function remote(url, params = {}, dataType = 'html') {

    return new Promise(function(resolve) {

        /*const headers = new Headers();
        headers.append('Content-Type', 'text/plain');

         if (dataType === 'json') {
             headers.set('Content-Type', 'application/json');
         }

         const request = new Request(url, {
             method: 'POST',
             body: serialize(params),
             redirect: 'follow',
             headers: headers
         });

         return fetch(request)
             .then(response => {
                 resolve(dataType === 'json' ? response.json() : response.text());
             });
        */

        let data = serialize(params);
        data[window.csrfTokenName] = window.csrfTokenValue;

        return axios.get(url, {
                params: data
            })
            .then(function(response) {
                resolve(response);
            })
            .catch(function(error) {
                console.log(error);
            });


        function serialize(data) {
            return Object.keys(data).map(function(keyName) {
                return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
            }).join('&');
        }

    });
}