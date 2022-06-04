const a = require('./out/index')

    // console.log(await stringifyTime(5100300,
    //     {
    //         valueNull: true,
    //         separator: '/'
    //     }))
    // console.log(a.formatTime(172800000, { format: 'M MMOO D MMOO', valueNull: false }))
    // console.log(a.formatDate(Date.now(), { format: 'DD D/MO MMOO /Y at H:M:S.ms' }))
    // console.log(a)
    console.log(a.formatTime(31556927894, { format: '[y YY, mo MMOO, d DD H:M:S.MS]', valueNull: true }))