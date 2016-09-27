/**
 * remote
 * @return JSON/HTML
 * Module for fetching remote content through ajax.
 */
export default function remote (url, params = {}, dataType = 'html') {

    const headers = new Headers();
    headers.append('Content-Type', 'text/plain');

    if (dataType === 'json') {
        headers.set('Content-Type', 'application/json');
    }

    const request = new Request(url, {
        method: 'GET',
        //body: JSON.stringify(params),
        redirect: 'follow',
        headers: headers
    });

    return fetch(request)
        .then(response => {
            return dataType === 'json' ? response.json() : response.text();
        });
}
