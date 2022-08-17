const tdt = require("./dist/index");

(async() => {

    const a = new tdt.DateSettings({ lang: "en", format: "R ; AA a aa A ; YY YYYY ; M MMM MM MMMM ; D DD DDD dddd ddd dd [It's] HH (H ; hh ; h) : (m) mm : ss (ss) . S (SS ; SSS)" });
    //console.log(await a.format(1660594792908))

    const settings_2 = new tdt.DateSettings({
        "format": "[The] DDD [of] MMMM YYYY [at] HH:mm:ss:SSS AA R"
    })
    //console.log(await settings_2.format(1600594792908))

    const firstSettings = new tdt.TimeSettings({ lang: "en", format: "a Y YYYY + M MMMM, W WWWW, D DDDD, h HH, m MM, s SS, sss SSSS a", precision: true, long: true });
    console.log(await firstSettings.format(565685100));

    const settings = new tdt.TimeSettings();
    //console.log(await settings.parse("2 y, 4 months + 22 days + 9 hours"));


})()