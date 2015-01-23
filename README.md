Webapp for Energy@Home
======================

This work is being done to take more confidence on [Jemma](https://github.com/ismb/jemma)'s REST API.

Jemma is part of the [Energy@Home](http://www.energy-home.it/SitePages/Home.aspx) project, that has the goal of developing and promoting technologies and services for energy efficiency in smart homes based on the interoperability and collaboration of the appliances within the household.

To interact with the Energy@Home eco-system, I'm using HTTP REST and WebSocket APIs exposed by the JEMMA platform. More details are available in these two link:
- [DAL HTTP REST and WebSocket APIs documentation](https://github.com/ismb/it.ismb.pert.osgi.dal.web-apis/blob/master/README.md)
- [Documentation of DAL Functions exposed by JEMMA devices](https://github.com/ismb/jemma/wiki/JEMMA-DAL-APIs-functions)

This work is ongoing.

Currently I have an error releated to CORS. A fast resolution about this problem is to disable web security on Chromeium using this command:
`chromium-browser --disable-web-security`

