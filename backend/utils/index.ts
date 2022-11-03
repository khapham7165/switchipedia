import fs from 'fs'

export const convertSwitchMdToJson = (string: string) => {
  const result = string
    .replace(/(^---)(\n\S)/gm, '{$2') // open object
    .replace(/^---\n/gm, '}') // end object
    .replace(/'(.+)'\n/gm, '$1\n') // remove '(string)'
    .replace(/"/gm, '\\"') // change quote
    .replace(
      /\|-\n(( +.+\n+)+)(([A-z-_0-9]+:)|})/gm,
      (subString, g1, g2, g3) => {
        const content = g1.replace(/\n/gm, '')
        return `${content}\n${g3}`
      }
    ) // remove many line
    .replace(/<p>(.+)<\/p>/gm, '$1') // remove html tags
    .replace(/^(\s{1,}-\n(\s+.+\n)+)(.)/gm, '\n[\n$1],\n$3') // define array of object
    .replace(/^(((\s{1,}(-.+\n)+))+)(.)/gm, '\n[\n$1\n],\n$5') // define array of string
    .replace(
      /(\s{1,})-\n((\s{1,}.+:(.+\n|\n+\[\n +(.+\n)+\n+],|\n\s+.+))+)/gm,
      '\n$1{\n$2$1},\n'
    ) // remove - \n
    .replace(/^(\s{1,})- (.+)\n/gm, '\n$1"$2",\n') // remove - \n
    .replace(/(\S+): (.+)/gm, '"$1": "$2",') // object string key and value
    .replace(/(\S+):\n/gm, '"$1":\n') // object string key and value
    .replace(/\n\n/gm, '\n') // object string key and value
    .replace(/,\n( {1,}]|])/gm, '\n]') // remove last last arr ,
    .replace(/,\n( {1,}\}|})/gm, '\n}') // remove last obj ,
    .replace(/"null"/gm, 'null') // convert "null" -> null
    .replace(/"{( +|)}"/gm, '{}') // convert "{ }" -> {}
    .replace(/((".+":)\n( +))/gm, '$2 null,\n$3') // add null to no value key
    .replace(
      /(".+": )"(([0-9]{1,}|)(\.|)[0-9]{1,})"/gm,
      (subString, g1, g2, g3, g4) => {
        let result = `${g1}${g2}` // to number
        if (!g3 && g4) result = `${g1}0${g2}` // .32 -> 0.32

        return result
      }
    ) // convert "number" -> number

  return JSON.parse(result)
}

export const readFiles = (
  dirname: string,
  onFileContent: (fileName: string, content: string) => void,
  onError: (err: Error) => void
) => {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err)
      return
    }
    filenames.forEach(function (filename) {
      fs.readFile(dirname + filename, 'utf-8', function (err, content) {
        if (err) {
          onError(err)
          return
        }
        onFileContent(filename, content)
      })
    })
  })
}
