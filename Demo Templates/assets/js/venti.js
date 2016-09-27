require('./src/storage.js');
import Calendar from './src/calendar.js';
import Tabs from './src/tabs.js';
import Modal from './src/modal.js';


(function(){
    //const calendar = new Calendar();
    const tabs = new Tabs(".tabs_tab",".tabs_content");
    const modal = new Modal();
    const cal = new Calendar();

}());
