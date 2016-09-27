// JSLint settings:
/*global
    clearTimeout,
    console,
    jQuery,
    setTimeout
*/

var TMF = (function ($, tm, window, document, undefined) {

        "use strict";

        tm.Helpers    = {};
        tm.touch      = false;
        tm.cssProps   = {};
        tm.Cookie     = {};
        tm.Search     = {};
        tm.Groups     = {
            modal   : $("#group-select-modal"),
            locale  : $("#filter-campus").find("option:selected").val(),
            gmodal  : $("#group-select-modal").remodal({ 'hashTracking': false })
        };
        tm.cp = tfc.components;

        tm.campuses = [ 
            {'tfc_hr': 'hollywood-road'},
            {'tfc_na': 'north-amarillo'},
            {'tfc_ea': 'east-amarillo'},
            {'tfc_p':  'pampa'},
            {'tfc_w':  'wellington'},
            {'tfc_d':  'decatur'},
            {'tfc_wf': 'wichita-falls'},
            {'tfc'  :  'trinity-fellowship'}
        ];


        /*
             Extend jQuery [data-hook] to $.hook
         */
        $.extend({
            hook: function(hookName) {
                var selector;
                if(!hookName || hookName === '*') {
                        // select all data-hooks
                        selector = '[data-hook]';
                } else {
                        // select specific data-hook
                        selector = '[data-hook~="' + hookName + '"]';
                }
                return $(selector);
            }
        });





        /* --------------------------------------------- *\
                tm VARIABLES.
        \*  --------------------------------------------- */

        var elements = [];

        // If you use console when IE doesn't have the "F12"
        // tools open, throws a "console not defined" error.
        tm.log = function () {
            // Safely log things, if need be.
            if (console && typeof console.log === 'function') {
                var i,
                    ii;
                for (i = 0, ii = arguments.length; i < ii; i++) {
                    console.log(arguments[i]);
                }
            }
        };



        /* --------------------------------------------- *\
                Initialize Function.
        \*  --------------------------------------------- */

        tm.init = function () {
            //tm.log('TM.INIT --');

            tm.touchDetect();
            //tm.Search.init();

            /*elements.push({
                el: '.tweet-quote',
                fn: tm.quote
            });*/

            tm.cssProps.transform = tm.Helpers.getsupportedProp(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']);

            // Google event analytics
            tm.gaEvents();

            //tm.runIf(elements);
        };


        /* --------------------------------------------- *\
                If element is in DOM run associated function.
        \*  --------------------------------------------- */

       /* tm.runIf = function (elms) {

            //tm.log("TM.RUNIF --");
            var fn, el, pr, i, ii;

            for (i = 0, ii = elms.length; i < ii; i++) {
                fn = elms[i].fn;
                el = $(elms[i].el);
                pr = elms[i].pr;

                if (el.length) {
                    fn(el,pr);
                }
            }

        };*/


        tm.touchDetect = function () {
            var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
            if(isTouch){
                tm.touch = true;
            }else{
                tm.touch = false;
            }
        };


        // tm.Search.init = function () {
        //     if (!$("body").hasClass('search-page')) {
        //         var inputs = [
        //             "st-input-access",
        //             "st-input-header",
        //             "st-input-header-stick",
        //             "st-input-mobile"
        //         ];

        //         for (var i = inputs.length - 1; i >= 0; i--) {
        //             if($("#" + inputs[i]).length > 0){
        //                 var elm = $("#" + inputs[i]),
        //                     filter = elm.data('filter');
        //                 tm.Search.add({el:elm,filter:filter});
        //             }
        //         };

        //         $("form[action='/search-results']").on('submit', function(evt){
        //             evt.preventDefault();
        //             var url = $(this).data('url') || "";
        //             var query = $(this).find('.search-input').val();
        //             window.location = url + "search-results/#stq=" + encodeURIComponent(query);
        //         });
        //     };
        // };

        // tm.Search.add = function (params) {
        //     var input = params.el,
        //             //meta = $("meta.swiftype[name='source']").attr('content'),
        //             meta = $("body").data("campus"),
        //             source = meta !== "" ? meta : "",
        //             types = params.filter !== '' ? params.filter : "",
        //             filters = null;



        //     if (types !== "") {
        //         filters = {'page': {'type': types, 'source':[source,'hfall'] }};
        //     }else if( source != ""){
        //         filters = {'page': {'source': [source,'hfall'] }};
        //     };

        //     var customRenderFunction = function(document_type, item) {
        //         var title = item.highlight['title'],
        //                 image = "";
        //         if (item.highlight['title'] == undefined) {
        //             title = item['title'];
        //         };
        //         if (item['image'] !== "") {
        //             image = '<img src="' + item['image'] + '" width="70px" height="70px" />';
        //         };

        //         var out = image.concat('<p class="title">' + title + '</p>');
        //         return out.concat('<p class="sections">' + item['type'] + '</p>');
        //     };
        //     var params = {
        //             renderFunction: customRenderFunction,
        //             searchFields: ['title','body'],
        //             resultLimit: 5,
        //             engineKey: ''
        //     };
        //     if (filters !== null) {
        //         params['filters'] = filters;
        //     };
        //     input.swiftype(params);
        // };


        tm.quote = function (elm) {
            $(elm).on('click',function(evt) {
                evt.preventDefault();
                var url = $(this).attr("href");
                tm.Helpers.windowpop(url,553,440);
            });
        };

        tm.checkIfAnalyticsLoaded = function () {
            if (window._gat && window._gat._getTracker) {
                tm.gaEvents();
            } else {
                // Retry. Probably want to cap the total number of times you call this.
                setTimeout(1000, tm.checkIfAnalyticsLoaded());
            }
        };

        tm.gaEvents = function () {
            //console.info("GA EVENTS INIT");
            $('body').on('click', '[data-ga]', function(evt) {
                var data = $(this).data('ga');
                ga('send', data.hitType, data.eventCategory, data.eventAction, data.eventLabel);
            });
        };  



        /* --------------------------------------------- *\
                HELPERS.
        \*  --------------------------------------------- */

        tm.Helpers.getsupportedProp = function (proparray) {
            var root=document.documentElement; //reference root element of document
            for (var i=0; i<proparray.length; i++){ //loop through possible properties
                if (typeof root.style[proparray[i]] === "string"){ //if the property value is a string (versus undefined)
                        return proparray[i]; //return that string
                }
            }
        };

        tm.Helpers.parseURL = function(url) {
                 var a =  document.createElement('a');
                 a.href = url;
                 return {
                    source: url,
                    protocol: a.protocol.replace(':',''),
                    host: a.hostname,
                    port: a.port,
                    query: a.search,
                    params: (function(){
                    var ret = {},
                        seg = a.search.replace(/^\?/,'').split('&'),
                        len = seg.length, i = 0, s;
                    for (;i<len;i++) {
                        if (!seg[i]) { continue; }
                        s = seg[i].split('=');
                        ret[s[0]] = s[1];
                    }
                     return ret;
                    })(),
                    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
                    hash: a.hash.replace('#',''),
                    path: a.pathname.replace(/^([^\/])/,'/$1'),
                    relative: (a.href.match(/tp:\/\/[^\/]+(.+)/) || [,''])[1],
                    segments: a.pathname.replace(/^\//,'').split('/')
                 };
            }

        tm.Helpers.isEmpty = function(value){
                return Boolean(value && typeof value == 'object') && !Object.keys(value).length;
        };

        tm.Helpers.isEmail = function (email) {
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!regex.test(email)) {
                 return false;
            }else{
                 return true;
            }
        };

        tm.Helpers.windowpop = function (url, width, height) {
                var leftPosition, topPosition;
                //Allow for borders.
                leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
                //Allow for title and status bars.
                topPosition = (window.screen.height / 2) - ((height / 2) + 50);
                //Open the window.
                window.open(url, "Tweet Quote", "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
        };

        tm.Helpers.getCampus = function (locale) {
            var campus = "";
            for (var i = tm.campuses.length - 1; i >= 0; i--) {
                if(locale in tm.campuses[i]){
                    campus = tm.campuses[i][locale];
                }
            }
            return campus;
        };



        /* --------------------------------------------- *\
                Cookies.
        \*  --------------------------------------------- */

        tm.Cookie.setCookie = function ( name, value, days ) {
            var seconds = days * 86400;
            if (typeof(seconds) != 'undefined') {
                var date = new Date();
                date.setTime(date.getTime() + (seconds*1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else {
                var expires = "";
            }
            document.cookie = name+"="+value+expires+"; path=/";
        };

         tm.Cookie.getCookie = function ( name ) {
            name = name + "=";
            var carray = document.cookie.split(';');

            for(var i=0;i < carray.length;i++) {
                var c = carray[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return null;
        };

        //tm.log("TM --");
        tm.init();
        return tm;

// jQuery, TM, window, document, undefined
}(jQuery, TMF || {}, this, this.document));
