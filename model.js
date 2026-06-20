const APIManager = function () {
  const getRandomUserPage = async function () {
    try {
      const pokemonId = Math.floor(Math.random() * 1025) + 1;

      const [usersRes, quoteRes, pokemonRes, baconRes] = await Promise.all([
        fetch("https://randomuser.me/api/?results=7"),
        fetch("https://api.kanye.rest"),
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
        fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1"),
      ]);

      if (!usersRes.ok) throw new Error("Could not fetch users");
      if (!quoteRes.ok) throw new Error("Could not fetch quote");
      if (!pokemonRes.ok) throw new Error("Could not fetch pokemon");
      if (!baconRes.ok) throw new Error("Could not fetch about me text");

      const usersData = await usersRes.json();
      const quoteData = await quoteRes.json();
      const pokemonData = await pokemonRes.json();
      const baconData = await baconRes.json();

      const mainUser = usersData.results[0];
      const friends = usersData.results.slice(1);

      return {
        user: {
          firstName: mainUser.name.first,
          lastName: mainUser.name.last,
          city: mainUser.location.city,
          state: mainUser.location.state,
          picture: mainUser.picture.large,
        },
        friends: friends.map((friend) => ({
          firstName: friend.name.first,
          lastName: friend.name.last,
        })),
        quote: quoteData.quote,
        pokemon: {
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
        },
        about: baconData[0],
      };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  return {
    getRandomUserPage,
  };
};
