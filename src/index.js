const filmsUrl = "http://localhost:3000/films"
const firstMovUrl = "http://localhost:3000/films/1"

function main(){
    fetchFirstMov()
    fetchMovs()
}

function fetchMovs(){
    fetch(filmsUrl)
    .then(resp => resp.json())
    .then(movies => renderMovies(movies))
}

function renderMovies(movies){
    movies.forEach(movie => {
        const movieTitleList = document.querySelector('#films')
        const movieTitleDiv = document.createElement('div')
        movieTitleDiv.className = "film item"
        movieTitleDiv.innerText = movie.title
        movieTitleDiv.id = movie.id
        movieTitleList.append(movieTitleDiv)
        // addMovieClick(movieTitleList, movieTitleDiv)
    })
}

// function addMovieClick(movList, movDiv){
//     movList.addEventListener('click', function(event){
//         if (event.target === movDiv){
//             fetch(`${filmsUrl}/${movDiv.id}`)
//             .then(resp => resp.json())
//             .then(movie => renderMovie(movie))
//         }
//     })
// }

function fetchFirstMov(){
    fetch(firstMovUrl)
    .then(resp => resp.json())
    .then(movie => renderMovie(movie))
}

function renderMovie(movie){
    const title = document.querySelector('#title')
    title.innerText = `${movie.title}`
    const poster = document.querySelector('#poster')
    poster.src = `${movie.poster}`
    const runtime = document.querySelector('#runtime')
    runtime.innerText = `${movie.runtime} minutes`
    const filmInfo = document.querySelector('#film-info')
    filmInfo.innerText = `${movie.description}`
    const showtime = document.querySelector('#showtime')
    showtime.innerText = `${movie.showtime}`
    const ticketCount = document.querySelector('#ticket-num')
    const ticketsRemaining = (movie.capacity - movie.tickets_sold)
    ticketCount.innerText = ticketsRemaining
    if (ticketsRemaining === 0){
        const ticketButton = document.querySelector(".ui.orange.button")
        ticketButton.innerText = "Sold Out"
        ticketButton.className = "sold-out"
    }
    addBuyTixClick(movie, ticketsRemaining)
}

function addBuyTixClick(movie, tix){
    const movCard = document.querySelector('.card')
    const ticketCount = document.querySelector('#ticket-num')
    movCard.addEventListener('click', function(event){
        if (event.target.className === "ui orange button"){
            if (tix > 0){
                tix -= 1
                console.log(tix)
                const reqObj = {
                    method: 'PATCH',
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({tickets_sold: (movie.tickets_sold += 1)})
                }
                fetch(firstMovUrl, reqObj)
                .then(resp => resp.json())
                .then(mov => {
                    ticketCount.innerText = tix}
                    )
                    if (tix === 0){
                        const ticketButton = event.target
                        ticketButton.innerText = "Sold Out"
                        ticketButton.className = "sold-out"
                    }
                    
            }
            else {
                const ticketButton = event.target
                ticketButton.innerText = "Sold Out"
                ticketButton.className = "sold-out"
            }

            }
        
    })
}

//haley note: I had a bunch of the advanced stuff going but then had to ctrl+z cause it messed up my original stuff :T oh well
//            ask derick, he saw it when i was asking for help
//            tell em, derick

main()