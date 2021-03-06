const hash = "5d35920d8298a03cdd29556477f02a05";

export const heroCharacters = () => {
  return fetch(
    `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=e680e5543fe28cd5b55866a7012dd7d9&hash=${hash}`
  )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    });
};

export const searchCharacter = (query) => {
  return fetch(
    `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=e680e5543fe28cd5b55866a7012dd7d9&hash=${hash}`
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const heroInfo_2 = (idNum) => {
  return fetch(
    `http://gateway.marvel.com/v1/public/characters/${idNum}?ts=1&apikey=e680e5543fe28cd5b55866a7012dd7d9&hash=${hash}`
  )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res.data.results[0];
    });
};

export async function heroInfo(idNum) {
  let link = `http://gateway.marvel.com/v1/public/characters/${idNum}?ts=1&apikey=e680e5543fe28cd5b55866a7012dd7d9&hash=${hash}`;
  let result = await fetch(link);
  let data = await result.json();
  return data.data.results[0].thumbnail.path;
}

export async function heroComics(idNum) {
  let link = `http://gateway.marvel.com/v1/public/characters/${idNum}/comics?ts=1&apikey=e680e5543fe28cd5b55866a7012dd7d9&hash=${hash}`;
  let result = await fetch(link);
  let data = await result.json();
  let resData = await data.data.results;
  return resData;
}
