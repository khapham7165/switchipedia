import { convertSwitchMdToJson } from './utils'
import fs from 'fs'
import mongoose from 'mongoose'

function readFiles(dirname: string, onFileContent: (fileName: string, content: string) => void, onError: (err: Error) => void) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

main().catch(err => console.log(err))

async function main() {

  await mongoose.connect('mongodb://localhost:27017/switch')

  const switchSchema = new mongoose.Schema({
    name: String
  });

  readFiles('./switches/', (fileName, content) => {
    try {
      console.log('fileName :>> ', fileName);
      const converted = convertSwitchMdToJson(content)
      console.log('converted :>> ', converted.id)
    }
    catch{(err: Error) => console.log('failed :>>', fileName)}
  }, (err) => console.log('err :>> ', err))

}