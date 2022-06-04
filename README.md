

# About

ms-time-tools is a powerful Node.js module that allows you to easily manage time.

###  Features
* [Installation](https://www.npmjs.com/package/ms-time-tools#installation)
* [Convert from milliseconds](https://www.npmjs.com/package/ms-time-tools#convert-from-milliseconds)
* [Convert from string](https://www.npmjs.com/package/ms-time-tools#convert-from-string)

# Installation
```
npm install --save ms-time-tools
```
# Examples
```js
const  tdt = require('time-date-tools'); // Import the module
```
## Convert time in milliseconds to string 
The function `formatTime()` converts time in milliseconds to a time in string with the format of your choice.
```js
tdt.formatTime(time, options);
```
<u>Here is the list of all the arguments available:</u>
|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|time|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|❌||Time in milliseconds to convert into string|
|format|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|Y-MO-W-D-H-M-S-MS|Format and order of time returned|
|lang|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|en|Language of time unities|
|valueNull|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|false|Removes values equal to zero|

<u>Some usage examples:</u>


```js

tdt.formatTime(654686145655, {});
/*
{
	y: 20, mo: 8, d: 29, h: 1, m: 0, s: 25, ms: 655,
	YY: 'years', MMOO: 'months', DD: 'days', HH: 'hour', MM: 'minute', SS: seconds', MMSS: 'milliseconds',
	Y: '20', MO: '08', D: '29', H: '01', M: '00', S: '25', MS: '655',
	yy: 'y', mmoo: 'mo', dd: 'd', hh: 'h', mm: 'm', ss: 's', mmss: 'ms'
}
*/

tdt.formatTime(65364,
	{ format: 'M:S.MS' }
); // 01:05.364

tdt.formatTime(
    449155098,
    {
	    format: 'D DD, h:M:S.ms',
	    lang: 'en'
    }
); // 05 days, 4:45:55.98

tdt.formatTime(31556927894,
    {
	    format: '[y YY, mo MMOO,] d DD H:M:S.MS',
    }
); // 1 year, 0 day 00:00:01.894

tdt.formatTime(31556927894,
    {
	    format: 'y YY, mo MMOO, d DD H:M:S.MS',
    }
); // 1 year, 01.894

```
