

# About

time-date-tools is a powerful Node.js module that allows you to easily manage time and date.

###  Features
* [Installation](https://github.com/joanc-04/time-date-tools/#installation)
* [Convert milliseconds to string time](https://github.com/joanc-04/time-date-tools/#installation)
* [Convert milliseconds to string date](https://github.com/joanc-04/time-date-tools/#convert-milliseconds-to-string-date)
* [Convert string time to milliseconds time](https://github.com/joanc-04/time-date-tools/#convert-string-time-to-milliseconds-time)

# Installation
```
npm install --save ms-time-tools
```
# Examples
```js
const tdt = require('time-date-tools'); // Import the module
```
<br>

## Convert milliseconds to string time
The function `formatTime()` converts time in milliseconds to a time in string with the format of your choice.
```js
tdt.formatTime(time, options);
```
<u>Here is the list of all the arguments available:</u>
|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|time|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|❌||Time in milliseconds to convert into string.|
|format|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|undefined|Format of string time returned. If not given, returns all the information about the time.|
|lang|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|en|Language of time unities ('en' or 'fr').|

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
<br>

## Convert milliseconds to string date
The function `formatDate()` converts date in milliseconds to a date in string with the format of your choice.
```js
tdt.formatDate(date, options);
```
<u>Here is the list of all the arguments available:</u>
|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|time|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|❌||Date in milliseconds to convert into string.|
|format|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|undefined|Format of string date returned. If not given, returns all the information about the date.|
|lang|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|en|Language of date unities ('en' or 'fr').|

Some usage examples:


```js

tdt.formatDate(Date.now(), {});
/*
{
    date: 2022-06-04T13:28:31.790Z,
    milliseconds: 790,
    millisecondsFull: '790',
    seconds: 31,
    secondsFull: '31',
    minutes: 28,
    minutesFull: '28',
    hours: 15,
    hoursFull: '15',
    days: 'sunday',
    daysNumber: 4,
    daysNumberIndice: '4',
    daysFullNumber: '04',
    daysFullNumberIndice: '04',
    months: 'june',
    monthsNumber: 6,
    monthsFullNumber: '06',
    years: '22',
    yearsFull: 2022
}
*/

tdt.formatDate(1654349360501,
    { format: 'M:S.MS' }
); // 29:44.883

tdt.formatTime(Date.now(),
    {
        format: 'DD D/MO/Y at H:M:S.MS',
        lang: 'en'
    }
); // sunday 04/06/2022 at 15:31:00.760

tdt.formatDate(0,
    {
        format: 'DD d-/MO/Y at H:M:S.MS',
    }
); // friday 1nd/01/1970 at 01:00:00.000

tdt.formatTime(1623324464826,
    {
        format: 'DD d MMOO Y',
    }
); // friday 10 june 2021

```
<br>

## Convert string time to milliseconds time
The function `parseTime()` converts time in string to a time in milliseconds.
```js
tdt.parseTime(time, options);
```
<u>Here is the list of all the arguments available:</u>
|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|time|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|❌||Time in string to convert into milliseconds.|
|msOff|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|false|Returns the time in seconds instead of milliseconds.|

Some usage examples:


```js

tdt.parseTime('2 days', {}); // 172800000

tdt.parseTime('5m 3s',
    { msOff: true }
); // 303

```
