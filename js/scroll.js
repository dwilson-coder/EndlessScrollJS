const url = 'https://script.google.com/macros/s/AKfycbxFlQXkvna9jYamLWhTQ1k3cJItWZDvCYoCmLTcN-CJcr7vZw/exec';
const val = {
  page: 1
};
const page = {};
page.loaderMore = true;
page.message = document.createElement('div');
page.message.textContent = "---Scroll to load more content---";
page.container = document.createElement('div');
page.container.textContent = "hello world";
page.main = document.querySelector('section');
page.main.append(page.container);
page.main.append(page.message);
firstLoad();
 
function firstLoad() {
  page.container.innerHTML = "";
  getCourses();
}
 
function getCourses() {
  const baseURL = url + '?p=' + val.page;
  page.message.textContent = "loading....";
  fetch(baseURL).then((rep) => rep.json()).then((json) => {
    if (json.data.pages.next != null) {
      page.loaderMore = true;
      page.message.textContent = "-Page " + val.page + " --Scroll to load more content---";
    }
    else {
      page.message.style.display = "none";
    }
 
    
    renderPost(json.data.posts)
  })
}
window.onscroll = function (ev) {

  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300)) {

    
    if (page.loaderMore) {
      page.loaderMore = false;
      addNewPosts();
    }
  }
}
 
function addNewPosts() {
  val.page++;
  getCourses();
}
 
function renderPost(data) {
  data.forEach(function (post) {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${post[8]}</h3>
    <div>${post[5]} stars by ${post[6]} students</div>
    <a href="${post[0]}" target="_blank">${post[2]}</a>
    <hr>
    `;
    page.container.append(div);
  })
}

