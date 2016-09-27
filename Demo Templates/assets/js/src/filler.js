import remote from "./remote";

class Filler {
    constructor (output = "body", url = null, params = {}) {
        //console.info("Filler Loaded");
        this._element = document.querySelector(output);
        this._eurl = url;
        this._params = params;
    }

    set eurl (url) {
        this._eurl = url;
    }

    get eurl () {
        return this._eurl;
    }

    set params (prm) {
        this._params = prm;
    }

    get params () {
        return this._params;
    }

    fetchContent () {
        const $this = this;
        remote(this._eurl,this._params).then( data => {
            $this._element.innerHTML = data;
        }).catch( (err) => {
            console.error(err);
        });
    }
}

export { Filler as default };
