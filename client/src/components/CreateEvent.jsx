import React from 'react'
import axios from 'axios'

class CreateEvent extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            date: '',
            time: '',
            description: '',
            imgurl: '',
            address: '',
            city: '',
            host: this.props.loggedInUser.username,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(e){
        e.preventDefault()
        axios.post('/events', this.state)
        .then(() => {
            alert('Event created!');
            this.setState({
                name: '',
                date: '',
                time: '12:00',
                description: '',
                imgurl: '',
                address: '',
                city: '',
            })
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render () {
        console.log(this.props);
        return (
            <form onSubmit = {this.handleSubmit} className = "field">
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Name</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <input name = 'name' value = {this.state.name} onChange = {this.handleChange} className="input" type="text" placeholder="Name"/>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Date</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-expanded">
                            <div className="field has-addons">
                                <input name = 'date' value = {this.state.date} onChange = {this.handleChange}className="input" type="text" placeholder="YYYY-MM-DD"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Time</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                            <div className="select is-fullwidth">
                            <select name = 'time' value = {this.state.time} onChange ={this.handleChange}>
                                <option value = "12:00">12:00 AM</option>
                                <option value = "1:00">1:00 AM</option>
                                <option value = "2:00">2:00 AM</option>
                                <option value = "3:00">3:00 AM</option>
                                <option value = "4:00">4:00 AM</option>
                                <option value = "5:00">5:00 AM</option>
                                <option value = "6:00">6:00 AM</option>
                                <option value = "7:00">7:00 AM</option>
                                <option value = "8:00">8:00 AM</option>
                                <option value = "9:00">9:00 AM</option>
                                <option value = "10:00">10:00 AM</option>
                                <option value = "11:00">11:00 AM</option>
                                <option value = "12:00">12:00 PM</option>
                                <option value = "13:00">1:00 PM</option>
                                <option value = "14:00">2:00 PM</option>
                                <option value = "15:00">3:00 PM</option>
                                <option value = "16:00">4:00 PM</option>
                                <option value = "17:00">5:00 PM</option>
                                <option value = "18:00">6:00 PM</option>
                                <option value = "19:00">7:00 PM</option>
                                <option value = "20:00">8:00 PM</option>
                                <option value = "21:00">9:00 PM</option>
                                <option value = "22:00">10:00 PM</option>
                                <option value = "11:00">11:00 PM</option>
                            </select>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Description</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                        <div className="control">
                            <textarea  name = 'description' className="textarea" placeholder="What do you want people to know about your event?" value = {this.state.description} onChange = {this.handleChange}></textarea>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Image URL</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                        <div className="control">
                            <textarea name = 'imgurl' 
                            className="textarea" 
                            placeholder="Enter an image URL for your event!" 
                            value = {this.state.imgurl} onChange = {this.handleChange}></textarea>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Address</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                        <div className="control">
                            <textarea name = 'address' className="input" type="text" placeholder="How can people find you?" value = {this.state.address} onChange = {this.handleChange}></textarea>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">City</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                        <div className="control">
                            <textarea name = 'city' className="textarea" placeholder="In what city will your event take place?" value = {this.state.city} onChange = {this.handleChange}></textarea>
                        </div>
                        </div>
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                    </div>
                 </div>
            </form>
        )
    }
}

export default CreateEvent