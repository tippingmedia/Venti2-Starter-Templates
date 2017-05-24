import Routes from './routes.js';
import Filler from './filler.js';
import { remoteUrls, remotePrefix } from "./config";

class Calendar {
    constructor () {
        //console.info("Calendar Loaded");
        const $this = this;
        this.calendars = localStorage.getObj('calendar.cal');
        this.router = new Grapnel({ pushState : true });
        this.setActiveCalendars();
        this.setCalendarEvents();

        const routes = {
            "cal/:year/:month/*" : function ( req, e ) {
                //console.log("ROUTER");
                var month = req.params.month,
                    year = req.params.year,
                    ids = req.params['2'];

                const curl = `/ajax/calendar/${year}/${month}/${ids}`;
                const eurl = `/ajax/events/${year}/${month}/${ids}`;

                const calendar = new Filler("#events-calendar", curl);
                const eventList = new Filler("#events-list", eurl);

                calendar.fetchContent();
                eventList.fetchContent();

                //console.info("%s :: %s", month, year);
                //console.info("PARAMS: %s", req.params[1]);
            }
        }

        Grapnel.listen(routes);
    }

    setActiveCalendars () {
        const form = document.querySelectorAll('.calendar-groups')[0];
        const today = new Date();
        const hash = window.location.hash.split("/");

        if (typeof this.calendars != 'undefined') {
            this.calendars.map((groupId) => {
                const id = `#cal-${groupId}`;
                form.querySelector(id).setAttribute("checked","checked");
            });

            if (hash.length !== 4) {
                //Set initial calendar
                const month = document.querySelector('[data-month]') !== undefined ? document.querySelector('[data-month]').dataset.month : today.getMonth() + 1;
                const year = document.querySelector('[data-year]') !== undefined ? document.querySelector('[data-year]').dataset.year : today.getFullYear();
                const selectedGroupIds = (this.calendars).length > 0 ? this.calendars : "*";
                const eurl = `cal/${year}/${month}/${selectedGroupIds}`;

                this.router.navigate(eurl);
            }

        }
    }

    setCalendarEvents () {
        const form = document.querySelectorAll('.calendar-groups')[0];
        const $this = this;
        const today = new Date();

        form.addEventListener('click', function (evt) {
            //evt.preventDefault();

            if (evt.target.classList.contains('calendar-groups-done') || evt.target.parentNode.classList.contains('calendar-groups-done')) {
                const groupInputs = form.querySelectorAll('input[type=checkbox]:checked');
                const selectedGroupIds = Array.from(groupInputs, input => {
                    return input.value;
                });

                const month = document.querySelector('[data-month]') !== undefined ? document.querySelector('[data-month]').dataset.month : today.getMonth() + 1;
                const year = document.querySelector('[data-year]') !== undefined ? document.querySelector('[data-year]').dataset.year : today.getFullYear();
                const eurl = `cal/${year}/${month}/${selectedGroupIds}`;

                $this.router.navigate(eurl);

                localStorage.setObj('calendar',{cal:Array.from(selectedGroupIds)});
            }
        });
    }
}

export { Calendar as default };
