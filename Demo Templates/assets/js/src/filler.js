//import remote from "./remote";
import axios from 'axios';

class Filler {
    constructor(output = "body", url = null, params = {}) {
        //console.info("Filler Loaded");
        this._element = document.querySelector(output);
        this._eurl = url;
        this._params = params;
    }

    set eurl(url) {
        this._eurl = url;
    }

    get eurl() {
        return this._eurl;
    }

    set params(prm) {
        this._params = prm;
    }

    get params() {
        return this._params;
    }

    fetchContent() {
        const $this = this;
        let data = this._params;
        data[window.csrfTokenName] = window.csrfTokenValue;

        axios.get(this._eurl, {
                params: data
            })
            .then(function(response) {
                $this._element.innerHTML = response.data;
            })
            .catch(function(error) {
                console.log(error);
            });


        // remote(this._eurl, this._params).then(data => {
        //     $this._element.innerHTML = data;
        // }).catch((err) => {
        //     console.error(err);
        // });

    }

    serialize(data) {
        return Object.keys(data).map(function(keyName) {
            return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
        }).join('&');
    }
}

export { Filler as default };