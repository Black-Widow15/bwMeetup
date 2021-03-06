import React from 'react';
import axios from 'axios';
import Comments from './Comments.jsx';
import AttendeeList from './AttendeeList.jsx';


class EventPage extends React.Component {
  constructor (props) {
  	super(props);


  	this.state = {
      // id is the identifier for all events upon componentDidMount
      id: this.props.match.params.number,  //React-Router passes in this parameter from the url.
      loggedInUser: this.props.loggedInUser,
      isAttending: false, 
      comments: [
      //   {
      //     commentId: 1,
      //     text: 'this is a comment',
      //     timestamp: '4:31pm',
      //     username: 'bonJoviRules',
      //     avatarUrl: 'https://image.flaticon.com/icons/svg/82/82984.svg',
      //   }
      ], // Array of objects pulled from messages table in db
      attendees: [
        // {
        //   username: 'howdy',
        //   avatarUrl: 'https://image.flaticon.com/icons/svg/82/82984.svg',
        // }
      ], // Array of objects pulled from users table in db
      info: {
        name: '',
        date: '',
        time: '',
        imgurl: '',
        // location: '',
        address: '',
        city: '',
        description: '',
        host: '',
      }, // Same data that was in the Event Summary cards.
  	};

    this.rsvp = this.rsvp.bind(this);
    this.fillEventData = this.fillEventData.bind(this);    
    this.fillCommentsFeed = this.fillCommentsFeed.bind(this);
    this.fillAttendeeFeed = this.fillAttendeeFeed.bind(this);
  }
  rsvp () {
    let current = this.state.isAttending;
    this.setState({
      isAttending: !current,
    })
    console.log('rsvp props', this.props);

    axios.post('/events/attendees', {
      eventId: this.state.id, 
      userId: this.state.loggedInUser.userId,
      isAttending: this.state.isAttending,
    })
      .then( (response) => {
        console.log('changed rsvp');
        this.fillAttendeeFeed();
      })
      .catch( (err) => {
        console.error(err);
      })
  }

  fillEventData () {
    console.log('filling event', this.state);
    axios.get(`/event/${this.state.id}`)
        .then((response) => {
          // console.log('Event data', response.data)
          this.setState({
            info: response.data[0],
          }, () => console.log('event info', this.state.info))
        })
        .catch((err) => {
          console.error(err);
        })
  }

  fillCommentsFeed () {
    axios.get('/events/comments', {
      params: {
        id: this.state.id,
      }
    })
      .then( (response) => {
        this.setState({
          comments: response.data,
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  fillAttendeeFeed () {
    axios.get('/events/attendees', {
      params: {
        id: this.state.id,
      }
    })
    .then((response) => {
      this.setState({
        attendees: response.data
      })

      this.state.attendees.forEach( (attendee) => {
        if (this.state.loggedInUser.username === attendee.username) {
          this.setState({
            isAttending: true,
          })
        } 
      })
    })
    .catch( (err) => {
      console.log(err);
    })
  }

  componentDidMount () {
    // function to fill the comments, the attendee list, other info
    // console.log('props', this.props);

    this.fillEventData();
    this.fillAttendeeFeed();
    this.fillCommentsFeed();
  }

  render () {
    // console.log('state in event page', this.state);
    let date = this.state.info.date.slice(0,10);
    return (
      <div>
        <section className="hero is-warning is-bold">
          <div className="hero-body">
            <div className="container">
              <div className="level-left">
                <div className="level-item">
                  <figure className="image is-128x128 is-square">
                    <img src={this.state.info.imgurl}/>
                  </figure>
                </div>
                <div className="level-item">
                  <div>
                    <h1 className="title">
                      {this.state.info.name}
                    </h1><p></p>
                    <h2 className="subtitle">
                    <strong>Hosted by: {this.state.info.host}</strong>
                    <p>{date}, {this.state.info.time}</p>
                    { this.state.loggedInUser ? 
                      <button 
                        id="rsvp" 
                        className="button is-link" 
                        onClick={(e) => {this.rsvp()}}
                      >
                        {this.state.isAttending ? 'Cancel' : 'RSVP' }
                      </button>
                      : null
                    }
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <p><strong>About the event</strong></p>
          <p>{this.state.info.description}</p>
          </section>
        <section>
          <br/>
          <div className="columns">
            <Comments 
              loggedInUser={this.state.loggedInUser} 
              commentList={this.state.comments}
              eventId={this.state.id}
              fillCommentsFeed={this.fillCommentsFeed}
            />
            <AttendeeList attendees={this.state.attendees} id={this.state.id}/>
          </div>
        </section>
      </div>
    )
  }
}

export default EventPage;
