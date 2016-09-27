class Tabs {
    constructor (tab = ".tabs_tab",content = ".tabs_content") {
        this.tab = tab;
        this.content = content;
        this.setupTabEvents();
        // this.detectHashChange();
        // if (window.location.hash !== "") {
        //     for (const tab of document.querySelectorAll(this.tab)) {
        //         if (tab.getAttribute('href') === window.location.hash) {
        //             this.toggle(tab);
        //         }
        //     }
        // }
    }

    setupTabEvents () {
        const $this = this;
        const tabs = document.querySelectorAll(this.tab);

        for (const tab of tabs) {
            tab.addEventListener('click', function (evt) {
                evt.preventDefault();
                $this.toggle(this);
            });
        }
    }

    toggle (tab) {
        if (tab !== null) {

            const content = Array.from(document.querySelectorAll(this.content));
            const containerId = tab.getAttribute('href');

            tab.parentNode.querySelector('.is-active').classList.toggle('is-active');
            tab.classList.toggle('is-active');

            for(const tabContent of content) {
                tabContent.style.display = "none";
            }

            document.querySelector(containerId).style.display = "block";
        }
    }

    detectHashChange(){
        const $this = this;
        window.onhashchange = function () {
            const tab = document.querySelector("a[href='"+window.location.hash+"']");
            if(tab !== undefined && $this !== undefined) {
                $this.toggle(tab);
            }
        }
    }
}

export { Tabs as default };
