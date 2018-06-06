import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Messages from './Messages.jsx'

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'pancake',
      image: 'https://i.pinimg.com/564x/ce/eb/92/ceeb92ff02869506c45878d00f8f651a.jpg',
      displayName: 'Pancake Jr.',
      musician: true,
      upcomingGigs: [],
      bio: 'sometimes they call me flapjack',
      photos: [],
      eventsAttending: [{name: 'a'}, {name: 'b'}, {name: 'c'}]
    };
  }

  componentDidMount() {
    axios.get('/')
    // get events that user is going to
    // get messages that have been posted on user's wall
  }

  render() {
    return(
    <div>
      <section className="hero is-warning is-bold">
        <div className="hero-body">
          <div className="container">
          <div className="level-left">
            <div className="level-item">
              <figure className="image is-128x128 is-square">
                <img src={this.state.image}/>
              </figure>
            </div>
            <div className="level-item">
              <div>
                <h1 className="title">
                  {this.state.displayName}
                </h1><p></p>
                <h2 className="subtitle">
                  @{this.state.name}
                </h2>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
      <section>
          <h2><strong>About me</strong></h2>
          <p>{this.state.bio}</p>
          <div className="columns">
            <Messages/>
            <div className="column">
              <div className="notification is-primary has-text-centered">
                events i am attending
              </div>
                <ul>
                  {this.state.eventsAttending.map(event => {
                    return (
                      <li><a href ="#">{event.name}</a></li>
                    )
                  })}
                  </ul>
            </div>
          </div>
      </section>
    </div>
    )
  }
}


export default User;
// each event that the user is going to will be card
