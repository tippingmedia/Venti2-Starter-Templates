class Tabs {
    constructor(tab = ".tabs_tab", content = ".tabs_content") {
        this.tab = tab;
        this.content = content;
        this.setupTabEvents();
    }

    setupTabEvents() {
        const $this = this;
        const tabs = document.querySelectorAll(this.tab);
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function(evt) {
                evt.preventDefault();
                $this.toggle(this);
            }, false);
        }
        // for (const tab of tabs) {
        //     tab
        // }
    }

    toggle(tab) {
        if (tab !== null) {

            const content = Array.from(document.querySelectorAll(this.content));
            const containerId = tab.getAttribute('href');

            tab.parentNode.querySelector('.is-active').classList.toggle('is-active');
            tab.classList.toggle('is-active');

            for (var i = 0; i < content.length; i++) {
                content[i].style.display = "none";
            }
            // for(const tabContent of content) {
            //     tabContent.style.display = "none";
            // }

            document.querySelector(containerId).style.display = "block";
        }
    }

    detectHashChange() {
        const $this = this;
        window.onhashchange = function() {
            const tab = document.querySelector("a[href='" + window.location.hash + "']");
            if (tab !== undefined && $this !== undefined) {
                $this.toggle(tab);
            }
        }
    }
}

export { Tabs as default };