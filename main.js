let news = [];
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click",(event)=>{
    getNewsByTopic(event);
}))

let searchButton = document.querySelector(".search-button");
let url;

// 각 함수에서 필요한 url을 만든다
// api호출 함수를 부른다.

const getNews = async ()=>{
   try{
    let header = new Headers({'x-api-key':'9cOmEeBlDd_8GHfIb6748kBIaLAIVEafVSWqCndLz6o'});
    let response = await fetch(url,{headers:header});
    let data = await response.json();
    if(response.status == 200){
      news = data.articles;
      render();
    }else{
      throw new Error(data.message);
    }
  }catch(error){

    console.log("잡힌 에러는?",error.message);
    errorRender(error)
  }

  let header = new Headers({'x-api-key':'9cOmEeBlDd_8GHfIb6748kBIaLAIVEafVSWqCndLz6o'});
  let response = await fetch(url,{headers:header});
  let data = await response.json();
  news = data.articles;
  console.log("받는 데이터가 뭐지?",data);
  page = data.page;
  total_pages = data.total_pages;
  render();
  pagenation();


}

const getLatestNews = async() => {
    url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
        );
        getNews();

};

const getNewsByTopic = async (event)=>{
    let topic = event.target.textContent.toLowerCase();
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
    getNews();
}

const getNewsByKeyword = async ()=>{
  //1. 검색 키워드 읽어오기
  //2. url에 검색 키워드 부치기
  //3. 헤더준비
  //4. url부르기
  //5. 데이터 가져오기
  //6. 데이터 보여주기

  let keyword = document.getElementById("search-input").value;
  url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
  getNews();
  
}

const render = ()=>{
    let newsHTML = '';
    newsHTML = news.map(item=>{
        return `<div class="news row">
            <div class="col-lg-4">
                <img class="news-img" src="${item.media}" />
            </div>
            <div class="col-lg-8">
                <h1>${item.title}</h1>
                <p>${item.summary}</p>
                <div>${item.rights} * ${item.published_date}</div>
            </div>
        </div>`
    }).join('');
    document.getElementById("news-board").innerHTML = newsHTML;
}


const errorRender = (message) =>{
  let errorHTML = `<div class="alert alert-danger" role="alert">${message}</div>`
  document.getElementById("news-board").innerHTML = errorHTML;
}


const pagenation = ()=>{
  let pagenationHTML = '';
  //total_page
  //current_page
  
  //page_group
  let pageGroup = Math.ceil(page/5);

  //last_page
  let lastPage = pageGroup*5;

  //first_page
  let firstPage = lastPage - 4;

  //first-last 페이지 프린트
  for(let i=firstPage; i <= lastPage; i++){
    pagenationHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
  }
  document.querySelector(".pagination").innerHTML = pagenationHTML
}

searchButton.addEventListener("click",getNewsByKeyword);
getLatestNews();


const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };