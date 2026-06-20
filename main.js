const apiManager = APIManager();
const renderer = Renderer();

let currentUserPage = null;

const getSavedUsers = function () {
  return JSON.parse(localStorage.getItem("users")) || {};
};

const saveUsers = function (users) {
  localStorage.setItem("users", JSON.stringify(users));
};

const renderSavedUsersDropdown = function () {
  const users = getSavedUsers();

  $("#saved-users").empty();
  $("#saved-users").append(`<option value="">Select saved user</option>`);

  Object.keys(users).forEach((userName) => {
    $("#saved-users").append(`
            <option value="${userName}">${userName}</option>
        `);
  });
};

const generateUser = async function () {
  const data = await apiManager.getRandomUserPage();

  if (data) {
    currentUserPage = data;
  }

  renderer.render(data);
};

$("#generate-user").on("click", function () {
  generateUser();
});

$("#save-user").on("click", function () {
  if (!currentUserPage) {
    return;
  }

  const users = getSavedUsers();

  const userName = `${currentUserPage.user.firstName} ${currentUserPage.user.lastName}`;

  users[userName] = currentUserPage;

  saveUsers(users);
  renderSavedUsersDropdown();
});

$("#load-user").on("click", function () {
  const selectedUser = $("#saved-users").val();

  if (!selectedUser) {
    return;
  }

  const users = getSavedUsers();
  const savedUserPage = users[selectedUser];

  currentUserPage = savedUserPage;
  renderer.render(savedUserPage);
});

renderSavedUsersDropdown();
generateUser();
