const clean = text => text.replace(/ \(.*?\)$/, '')
const camelize = str => // thx https://stackoverflow.com/a/2970667
  str.replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  })

Object.fromEntries(
  Array.from(document.querySelectorAll('table.statistics'))
    .map(stats => {
      return [
        camelize(clean(stats.querySelector('thead th').innerText)),
        Object.fromEntries(
          Array.from(stats.querySelectorAll('tbody tr')).map(row => [
            camelize(clean(row.querySelector('th').innerText)),
            parseInt(clean(row.querySelector('td:last-child').innerText).replace(/[^\d+\.]/g, ''), 10)
          ])
        )
      ]
    })
)
