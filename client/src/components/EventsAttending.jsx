import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class EventsAttending extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      image: '',
      displayName: '',
      bio: '',
      pinnedTrackUrl: '',
      photos: [],
      eventsAttending: []
    }
  }

  eventClick {
    // clicking on an event goes to it
    // sends axios get request to /event
    // include event id in params
    // photo corresponds to a specific event
    // express server checks db and gets info about the event
    // redirects user to event page
    axios.get('/event', {
      params: {
        imgUrl: 
      }

    }
    // each event thumbnail is a link that, when clicked on
    // leads to the specific event
  }


}