
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
const  mtt = require('ms-times-tools'); // Import the module
```
## Convert from milliseconds
Here is the list of all the arguments available:
|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|time|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|❌||Time in milliseconds to convert into string|
|format|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|Y-MO-W-D-H-M-S-MS|Format and order of time returned|
|lang|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|en|Language of time unities|
|long|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|false|Returns the whole word (not abbreviations)|
|separator|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|, |Separators of time values|
|suppressTag|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|false|Returns time without unities|
|valueNull|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|false|Removes values equal to zero|

Some usage examples:

```js
mtt.stringifyTime(61000); // 1m, 1s

mtt.stringifyTime(
    617780000,
	{
	    format: 'Y-MO-W-D-H-M-S-MS',
		lang: 'en',
		long: true
	}
); // 1 week, 3 hours, 36 minutes, 20 seconds

mtt.stringifyTime(
	5100300,
	{
		valueNull: true,
		separator: '/'
	}
); // 0y/0mo/0w/0d/1h/25m/0s/3ms

mtt.stringifyTime(
	35071,
	{ suppressTag: true }
); // 35, 71
```

## Convert from string
Here is the list of all the arguments available:
|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|time|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|❌||Time in string to convert into milliseconds|
|msOff|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|false|Returns time in seconds instead of milliseconds|

Some usage examples:

```js
mtt.parseTime('1 minute 1 second'); // 61000

mtt.parseTime(
    '2h 5m',
	{ msOff: true }
); // 7500

mtt.parseTime('1 month 2d 4hours'); // 187260000

mtt.stringifyTime(
	35071,
	{ suppressTag: true }
); // 35, 71
```

## Format time
Here is the list of all the arguments available:
|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|time|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|❌||Time to format|
|format|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|y YYYY, mo MMMM, d DD H:M:S.MS|Format and order of time returned, check [here]() for more information|
|lang|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|en|Language of time unities|
|long|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|false|Returns the whole word (not abbreviations)|
|suppressTag|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|false|Returns time without unities|
|valueNull|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|false|Removes values equal to zero|

Some usage examples:

```js  
mtt.formatTime(654686145655); // 20 years, 8 months, 29 days 01:00:25.655

mtt.formatTime(
    65364,
    { format: 'M:S.MS' }
); // 01:05.364

mtt.formatTime(
    449155098,
    { format: 'D DD, h:M:S.ms' }
); // 05 days, 4:45:55.98
```