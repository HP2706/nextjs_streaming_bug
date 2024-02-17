
this is a bug report

the main issue is that streamingresponse doesnt seem to work properly when compression is on.
reproduce the bug for yourself by running 
npm run dev

first try to enable compression in next.config.js/next.config.mjs
then click on the screen and watch the countdown.

the try to set compression to false and watch how the data this time is streamed properly



