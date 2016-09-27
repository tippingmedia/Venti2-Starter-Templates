import remote from "./remote";

class Routes {
    constructor (routes = {}) {
        this._router = new Grapnel();
        this._routes = routes;

        if (routes.length > 0) {
            this.listen();
        }
    }

    set routes (routes) {
        this._routes = routes;
        this.listen();
    }

    get routes () {
        return this._routes;
    }

    listen () {
        Grapnel.listen(this._routes);
    }

    nav (url) {
        this._router.navigate(url);
    }
}

export { Routes as default };
