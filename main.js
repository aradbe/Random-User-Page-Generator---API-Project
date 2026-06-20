const apiManager = APIManager();
const renderer = Renderer();

const generateUser = async function () {
  const data = await apiManager.getRandomUserPage();
  renderer.render(data);
};

$("#generate-user").on("click", function () {
  generateUser();
});

generateUser();
