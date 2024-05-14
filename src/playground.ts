const nature = (callback) => {
  const data = '';
  callback(data);
};

nature((data) => {
  console.log(data);
});

const nature2 = () => {
  return new Promise((resolve, reject) => {
    resolve('🦖');
  });
};

nature2().then((data) => {
  console.log(data);
});

const nature3 = () => {
  console.log('begin~~~~~');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('🦖');
    }, 2000);
  });
};

nature3().then((data) => {
  console.log(data);
});

const demo = async () => {
  const data = await nature3();
  console.log(data);
};

demo();

console.log('🌋');
