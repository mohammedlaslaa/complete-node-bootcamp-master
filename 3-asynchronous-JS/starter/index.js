const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('I could not find that file');
      resolve('Success !');
    });
  });
};

// Case 3 Handled Promise with async await

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(` Breed : ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    
    const all = await Promise.all([res1Pro, res2Pro, res3Pro])
    const img = all.map(el => el.body.message)
    console.log(all)
    console.log(img);

    await writeFilePro(`dog-img.txt`, img.join('\n'));
    console.log('Random of image saved to file !');
  } catch (err) {
    console.log(err);
    throw err;
  }

  return '2: READY';
};

(async () => {
   try {
    console.log('1: Search for dog pics')
    const x = await getDogPic();
    console.log(x)
    console.log('3: Done getting dog pics')
   } catch (err) {
    console.log('ERROR !')
   }
})();

/*console.log('1: Search for dog pics')
getDogPic().then(x =>{
    console.log(x);
    console.log('3: Done getting dog pics')
}).catch(err => {
    console.log('ERROR !')
})*/

/* Case 2 Use the function where we store the promise
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
      console.log(`Breed : ${data}`)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message)
  })
  .then(() => console.log(`Good !`))
  .catch(err => {
    console.log(err);
  });
  */
// Case 1 when we use the callback function
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed : ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body.message);
//       fs.writeFile(`dog-img.txt`, res.body.message, err => {
//         console.log(`Good !`);
//       });
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
//  .end((err, res) => {
//      if (err) return console.log(err.message);
//      console.log(res.body.message);
//      fs.writeFile(`dog-img.txt`, res.body.message, err => {
//          console.log(`Good !`);
//      });
// });
// });
