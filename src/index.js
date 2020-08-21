const url = "http://localhost:3000/films"
let poster = document.getElementsByClassName("four wide column")[1];


function main(){
    fetchFilms();
    buyTicket();
}


function fetchFilms(){
    fetch(url)
    .then(r => r.json())
    .then(films => 
        filmPoster(films))
}


function filmPoster(films){
    allMovies = films
    firstPoster();
    filmHtml();
}


function firstPoster() {
    const filmPoster = document.getElementById("poster")
    filmPoster.src = allMovies[0].poster
}


function filmHtml() {
    const title = document.getElementById("title")
        title.innerText = allMovies[0].title

    const run = document.getElementById("runtime")
        run.innerText = `${allMovies[0].runtime} minutes`

    const desc = document.getElementById("film-info")
        desc.innerText = allMovies[0].description

    const showtm = document.getElementById("showtime")
        showtm.innerText = allMovies[0].showtime

    const tix = document.getElementById("ticket-num")
        const tixRem = (allMovies[0].capacity - allMovies[0].tickets_sold)
    
    tix.innerText = `${parseInt(tixRem)}`
}


/// purchase button thing? i hope? /////
function buyTicket() {
    showPanel = document.getElementById("showing")
    showPanel.addEventListener('click', (event)=> {
        event.preventDefault();
        let desc = parseInt(showPanel.querySelectorAll('span')[1].innerText)
        if (desc > 0) {
            allMovies[0].tickets_sold = allMovies[0].tickets_sold + 1
            let totalSold = allMovies[0].tickets_sold
            filmHtml()
            fetchPatch(totalSold)
        };
        // event.target.innerText = 'Sold Out'
    })

}



function fetchPatch(ticketsSold){
    currentUrl = `${url}/${allMovies[0].id}`
    console.log(ticketsSold)
    fetch( currentUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({tickets_sold: ticketsSold})
    })
}

    

///// initializer ////
 main()





///// first failed attempt cause i read the wrong thing like a dummy /////

// function fetchMovies(){
//     fetch('http://localhost:3100/films')
//     .then(resp => resp.json())
//     .then(films => {
//         renderFilms(films)
//     })
// }



// function createClickListener(){
//     const div = document.getElementById('films')
//     div.addEventListener('click', function(event){
//       if(event.target.tagName === 'LI') {
//         const filmId = event.target.dataset.id
//         fetch(`http://localhost:3000/films/${filmId}`)
//         .then(resp => resp.json())
//         .then(film => {
//           renderShowFilm(film)
//         })
//       }
//     })
// }

// function renderShowFilm(film){
//     console.log(film)
//     const showPanel = document.querySelector("#showing");
//     console.log(showPanel)
    // const filmHtml = `
        
    
    //     <div id="title" class="title">${film.title}</div>
    //     <div id="runtime" class="meta">${film.runtime} minutes</div>
    //     <div class="content">
    //         <div class="description">
    //             <div id="film-info">${film.description}</div>
    //             <span id="showtime" class="ui label">${film.showtime}]</span>
    //             <span id="ticket-num">${film.capacity}</span> remaining tickets
    //         </div>
    //     </div>
    //     <div class="extra content">
    //     <div class="ui orange button">Buy Ticket</div>
    //     </div>`;
    // showPanel,innerHTML = filmHtml

// }




// const filmHtml= `
// <div class="film item">${film.title}</div>
// <div class="sold-out film item">(Title of a sold-out film)</div>
// <div class="film item">(Title of film)</div>`


