var siteNmeInput = document.getElementById("name");
var siteUrlInput = document.getElementById("url");

var dataList;

if (localStorage.getItem("data") == null) {
  dataList = [];
} else {
  dataList = JSON.parse(localStorage.getItem("data"));
  display();
}
function addData() {
  if (
    siteNmeInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    var data = {
      name: siteNmeInput.value,
      url: siteUrlInput.value,
    };
    dataList.push(data);
    localStorage.setItem("data", JSON.stringify(dataList));
    display();
    clear();
  } else {
    var cartona = "";
    cartona += `<div
        class="lightBoxContainer position-fixed top-0 bottom-0 start-0 end-0 z-1 justify-content-center align-items-center d-flex"
      >
        <div class="lightBox">
          <div
            class="icon-link d-flex justify-content-between align-items-center px-4 pt-5"
          >
            <div class="round d-flex justify-content-center align-items-center">
              <p class="rounded-circle p-2 me-2 round1"></p>
              <p class="rounded-circle p-2 me-2 round2"></p>
              <p class="rounded-circle p-2 me-2 round3"></p>
            </div>
            <div onclick = "closeing()" id="close" class="icon">
              <i class="fa-solid fa-xmark fs-3 fw-bolder"></i>
            </div>
          </div>
          <div class="text">
            <h5 class="m-0 py-4 ps-4 fs-4">
              Site Name or Url is not valid, Please follow the rules below :
            </h5>
          </div>
          <div class="icons ps-4">
            <div class="text-icon d-flex align-items-center">
              <i class="fa-regular fa-circle-right pb-3 pe-2 right"></i>
              <p class="fs-5">Site name must contain at least 3 characters</p>
            </div>
            <div class="text-icon d-flex align-items-center">
              <i class="fa-regular fa-circle-right pb-3 pe-2 right"></i>
              <p class="fs-5">Site URL must be a valid one</p>
            </div>
          </div>
        </div>
      </div>`;

    document.getElementById("cartona").innerHTML = cartona;
  }
}
submit.addEventListener("click", function () {
  addData();
});
function closeing() {
  document.getElementById("cartona").innerHTML = "";
}

function display() {
  var cartona = "";
  for (var i = 0; i < dataList.length; i++) {
    cartona += `<tr>
              <td class="pt-3">${i + 1}</td>
              <td class="pt-3">${dataList[i].name}</td>
              <td>
                <button onclick="visit('${
                  dataList[i].url
                }')" id="visit" class="visit btn btn-visit px-3 py-2">
                  <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
              </td>
              <td>
                <button onclick="deleteData(${i})" id="delete" class="btn btn-delete px-3 py-2">
                  <i class="fa-solid fa-trash-can pe-2"></i>Delete
                </button>
              </td>
            </tr>`;
  }

  document.getElementById("tbody").innerHTML = cartona;
}
function clear() {
  siteNmeInput.value = null;
  siteUrlInput.value = null;
}

function deleteData(deletedIndex) {
  dataList.splice(deletedIndex, 1);
  display();
  localStorage.setItem("data", JSON.stringify(dataList));
}

function validation(element) {
  var regex = {
    name: /^\w{3,}$/,
    url: /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-z]{2,})$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function visit(url) {
  if (url && url.startsWith("http")) {
    window.open(url, "_blank");
  } else {
    alert("Invalid URL!");
  }
}
