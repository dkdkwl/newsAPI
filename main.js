let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click",(event)=>{
    getNewsByTopic(event);
}))
console.log(menus);
const getLatestNews = async() => {
    let url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
        );
        let header = new Headers({'x-api-key':'9cOmEeBlDd_8GHfIb6748kBIaLAIVEafVSWqCndLz6o'});

        let response = await fetch(url,{headers:header});
        let data = await response.json();
        news = data.articles;
        
        render();

};

const getNewsByTopic = (event)=>{
    console.log("클릭됨",event.target.textContent)
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
    console.log(news)
    document.getElementById("news-board").innerHTML = newsHTML;


}

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