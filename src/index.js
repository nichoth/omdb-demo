import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { html } from 'htm/react';
var observ = require('observ')
var struct = require('observ-struct')
var Bus = require('@nichoth/events')
var namespace = require('@nichoth/events/namespace')

var evs = namespace({
    // count: ['inc', 'dec']
    movie: ['response']
})

var bus = Bus({ memo: true })

var state = struct({
    movie: observ({})
})

bus.on(evs.movie.response, (mov) => {
    // we left off here, handling the api response
})


// text input for movie search
// Make a call to the OMDB API with the movie title from the search field.
// Display ‘Movie Not Found” if the movie you searched was not returned from the API.
// Below the search field, display the title, the year released, and the plot.
// Display the genres of the movie as a list.
 
// omdb api
// api key -- 922db138


function App () {
    var [_state, setState] = useState(state());
    state(function onChange (newState) {
        setState(newState)
    })
    var emit = bus.emit.bind(bus)

    return html`<div className="app">
        <${TitleInput} />
    </div>`

    function byTitle (ev) {
        ev.preventDefault()
        var title = ev.target.elements['title'].value

        fetch(`http://www.omdbapi.com/?apikey=922db138&t=${title}`)
            .then(res => {
                console.log('api res', res)
                if (!res.ok) res.text().then(t => console.log('t', t))
                res.json().then(json => console.log('json', json))
            })
            .catch(err => {
                console.log('errr', err)
            })
    }

    function TitleInput (props) {
        return html`<form onSubmit=${byTitle}>
            <input id="title" name="title" required=${true} />
            <button type="submit">submit</button>
        </form>`
    }


}

ReactDOM.render(html`<${App} />`, document.getElementById('content'));
