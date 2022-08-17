# About
`time-date-tools` is a powerful Node.js module that allows you to **easily manage time** and **date**. You can configure a lot of features to not have date and time issues anymore.
<br>
If you have any question, you can join our community on [**Discord**](https://discord.gg/bUnFAccHmJ).

###  Features
- [Installation](https://github.com/joanc-04/time-date-tools/#installation)
- [Importation](https://github.com/joanc-04/time-date-tools/#importation)
- [Time](https://github.com/joanc-04/time-date-tools/#time)
  * [Format](https://github.com/joanc-04/time-date-tools/#format-time) : Convert a time in milliseconds to a time in string.
  * [Parse](https://github.com/joanc-04/time-date-tools/#parse-time) : Convert a time in string to a time in milliseconds.
- [Date](https://github.com/joanc-04/time-date-tools/#date)
  * [Format](https://github.com/joanc-04/time-date-tools/#format-date) : Convert a date in milliseconds to a date in string.

# Installation
```
$ npm install --save time-date-tools
```

# Usage
### Importation
```ts
import tdt from "time-date-tools";          // Es Modules
const tdt = require("time-date-tools");     // CommondJS
```

<br>

## Time

### Format Time

<br>

> #### Class *TimeSettings* for the format:

Before call the `format()` function, you have to create a class called `TimeSettings`. This function allows you to save the configuration you want in a variable, instead of rewrite everything.
```ts
new TimeSettings(options);
```
Available options in the configuration for the `format()` function:

|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|lang|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|en|Language of time unities ('en' or 'fr').|
|format|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|Y YYYY, M MMMM, W WWWW, D dddd, h HH, m MM, s SS, sss SSSS|Format* of the string time.|
|precision|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|true|If false, it will round and return the bigger nonnull unity. Else, all the unities are returned.|
|long|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|✅|true|Complete the previous argument, if false, it will return the short unity. Else it will return the long unity.|

\*Format: By default, the null unities aren't displayed. If you want to display them, you can surround some parts of the format by `[` and `]`.

<br>
Available token for the time format:

|Token|Meaning|Examples of output|
|:-:|:-:|:-:|
|YYYY|Year unity|years, year|
|yyyy|Year unity (short)|y|
|Y|Year value|1|
|MMMM|Month unity|months, month|
|mmmm|Month unity (short)|mo|
|M|Month value|2|
|WWWW|Week unity|weeks, week|
|wwww|Week unity (short)|w|
|W|Week value|3|
|DDDD|Day unity|days, day|
|dddd|Day unity (short)|d|
|D|Day value|4|
|HH|Hour unity|hours, hour|
|hh|Hour unity (short)|h|
|h|Hour value|5|
|MM|Minute unity|minutes, minute|
|mm|Minute unity (short)|m|
|m|Minute value|6|
|SS|Second unity|seconds, second|
|ss|Second unity (short)|s|
|sss|Second value|7|
|SSSS|Millisecond unity|milliseconds, millisecond|
|ssss|Millisecond unity (short)|ms|
|sss|Millisecond value|8|

<br>
<br>

> #### Function *format()*:

Now the settings ready, you can call the function `format()` which convert a time in milliseconds to a string with the format of your choice.

```ts
const TimeSettingsFormat = new TimeSettings({ lang: "en", format: "Y YYYY, M MMMM, W WWWW, D DDDD, h HH, m MM, s SS, sss SSSS" });
TimeSettingsFormat.format(timeInMilliseconds);
```
Available arguments in the `format()` function:

|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|timeInMilliseconds|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|❌||Time in milliseconds to convert into a string.|

<br>
<br>

> #### Examples:
```ts
const settings_1 = new TimeSettings({ lang: "en", format: "Y YYYY, M MMMM, W WWWW, D dddd, h HH, m MM, s SS, sss SSSS" });
const settings_2 = new TimeSettings({ lang: "en", format: "[Y YYYY, M MMMM,] W WWWW, D dddd, h HH, m MM, s SS, sss SSSS" });

settings_1.format(361410); // 6 minutes, 1 second, 410 milliseconds
settings_2.format(361410); // 0 year, 0 month, 6 minutes, 1 second, 410 milliseconds


const settings_3 = new TimeSettings({ lang: "en", precision: false, long: true });
const settings_4 = new TimeSettings({ lang: "en", precision: false, long: false });
const settings_5 = new TimeSettings({ lang: "en", precision: true, long: true });

settings_3.format(486000000); // 6 days
settings_4.format(486000000); // 6d
settings_5.format(486000000); // 0 year, 0 month, 0 week, 5 days, 15 hours, 0 minute, 0 second, 0 millisecond

```
<br>

### Parse Time

<br>

> #### Class *TimeSettings* for the parse:

Before call the `parse()` function, you have to create a class called `TimeSettings`. This function allows you to save the configuration you want in a variable, instead of rewrite everything.
```ts
new TimeSettings();
```
There is no available option for the `parse()` function. You can put the same options as for the `format()` function, but it won't change anything for the result.

<br>
<br>

> #### Function *parse()*:

Now the settings ready, you can call the function `parse()` which convert a time in string to milliseconds.

```ts
const TimeSettingsParse = new TimeSettings();
TimeSettingsParse.parse(timeInString);
```
Available arguments in the `parse()` function:

|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|timeInString|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|❌||Time in string to convert into milliseconds.|

<br>
<br>

> #### Examples:
```ts
const settings = new TimeSettings();

settings.parse("3 minutes and 8 seconds"); // 188000
settings.parse("2 y, 4 months + 22 days + 9 hours"); // 75566252000
```


<br>

## Date

### Format Date

<br>

> #### Class *DateSettings* for the format:

Before call the `format()` function, you have to create a class called `DateSettings`. This function allows you to save the configuration you want in a variable, instead of rewrite everything.
```ts
new DateSettings(options);
```
Available options in the configuration for the `format()` function:

|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|lang|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|en|Language of date unities ('en' or 'fr').|
|format|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|✅|DD/MM/YYYY, HH:mm:ss.SSS|Format* of the string date.|

*Format: If you want to dodge some words in the format string, you can surround them with `[` and `]`. It can be useful if you want to format a date, you can refer to the examples.

<br>
Available token for the date format:

|Token|Meaning|Examples of output|
|:-:|:-:|:-:|
|YYYY|Four-digit year|1970, 2022|
|YY|Two-digit year|70, 22|
|MMMM|Month name (long)|January, December|
|MMM|Month name (short)|Jan, Dec|
|MM|Two-digit month|01, 12|
|M|One-digit month|1, 12|
|dddd|Day of week (long)|monday, sunday|
|ddd|Day of week (short - three-digit)|mon, sun|
|dd|Day of week (short - two-digit)|mo, su|
|DDD|Ordinal notation of date|1st, 2nd, 3rd, 4th|
|DD|Two-digit date|01, 31|
|D|One-digit date|1, 31|
|HH|Two-digit 24-hour|01, 23|
|H|One-digit 24-hour|1, 23|
|hh|Two-digit 12-hour|01, 11|
|h|One-digit 12 hour|1, 11|
|mm|Two-digit minute|01, 59|
|m|One-digit minute|1, 59|
|ss|Two-digit second|01, 59|
|s|One-digit second|1, 59|
|SSS|Three-digit millisecond|001, 999|
|SS|Two-digit millisecond|01, 99|
|S|One-digit millisecond|1, 9|
|R|Roman year|MMXXII|
|AA|Meridiem (uppercase with ellipsis)|A.M., P.M.|
|A|Meridiem (uppercase)|AM, PM|
|aa|Meridiem (lowercase with ellipsis)|a.m., p.m.|
|a|Meridiem|am, pm|

<br>
<br>

> #### Function *format()*:

Now the settings ready, you can call the function `format()` which convert a date in milliseconds to a string with the format of your choice.

```ts
const DateSettingsFormat = new DateSettings({ lang: "en", format: "DD/MM/YYYY, HH:mm:ss.SSS" });
DateSettingsFormat.format(dateInMilliseconds);
```
Available arguments in the `format()` function:

|Parameter|Type|Optional|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|dateInMilliseconds|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|❌||Date in milliseconds to convert into a string.|

<br>
<br>

> #### Examples:
```ts
const settings_1 = new DateSettings({ lang: "en", format: "[The] DDD [of] MMMM YYYY [at] hh:mm AA" }); // sunday 14/08/2022, 09:35:33.766
const settings_2 = new DateSettings({ lang: "en", format: "[It's] HH:mm:ss.SSS" });

settings_1.format(1660594792908); // The 15th of august 2022 at 10:19 P.M.
settings_2.format(1660594792908); // It's 22:19:52.908

```