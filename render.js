const Renderer = function () {
  const properCase = function (word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  const render = function (data) {
    if (!data) {
      $("#container").prepend(
        `<div class="error">Something went wrong. Try again.</div>`,
      );
      return;
    }

    $(".error").remove();

    $("#user-card").html(`
            <img src="${data.user.picture}">
            <div>
                <h2>${data.user.firstName} ${data.user.lastName}</h2>
                <h3>${data.user.city}, ${data.user.state}</h3>
            </div>
        `);

    $("#quote").html(`
            <p>Favorite quote:</p>
            <h2>"${data.quote}"</h2>
            <h3>-Kanye West</h3>
        `);

    $("#pokemon").html(`
            <img src="${data.pokemon.image}">
            <span>Favorite Pokemon: ${properCase(data.pokemon.name)}</span>
        `);

    $("#about").html(`
            <h3>About me</h3>
            <p>${data.about}</p>
        `);

    let friendsHTML = `<h2>Friends</h2>`;

    data.friends.forEach((friend) => {
      friendsHTML += `<p>${friend.firstName} ${friend.lastName}</p>`;
    });

    $("#friends").html(friendsHTML);
  };

  return {
    render,
  };
};
