# Venti 2 Starter Templates

### Demo Templates `FOLDER`
The `Demo Templates` folder holds files that are part of a working demo.  They have the css & js included to show a full functioning use of Venti.  From an event list to calendar to the event detail page. Also included is a Group selector for the calendar and list. This will toggle the group events that are visible.

Include these template files in a Craft CMS setup with Venti 2 installed.  
* Set your page entry type handle to `eventsLanding`.
* Set your groups detail template to `events/_entry`.
* Set your search landing page entry type to `eventsSearch`.

This demo populates content using ajax. Setup two routes in the CP routes settings:
* **route** `ajax/calendar/(year)/(month)/(*)` | **template** `events/ajax/_calendar`
* **route** `ajax/events/(year)/(month)/(*)` | **template** `events/ajax/_events`

### Snippets `FOLDER`
The `Snippets` folder holds files with snippets of code to give you a start and an idea how Venti 2 functions.
