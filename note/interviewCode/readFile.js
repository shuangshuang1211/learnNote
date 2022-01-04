const fs = require('fs');
const { task } = require('folktale/concurrency/task');
const { split } = require('lodash/fp');

const readFile = (path) => {
  return task((resolve) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err)  resolve.reject(err)
      resolve.resolve(data)
    })
  });
}

readFile('../../package.json')
  .map(split('\n'))
  .map(console.log)
  .run()
  .listen({
    onRejected: (err) => {
      console.log(err);
    },
    onResolved: (data) => {
      console.log(data);
    }
  })