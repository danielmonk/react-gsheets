import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, Container, Header } from 'semantic-ui-react'
import './App.css';
import './Stability.css';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name: '',
       rating: '',
       domain: window.location.hostname,
       isActive:true
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    if (!this.state.rating) return;
    axios.post('https://sheet.best/api/sheets/17f21277-f984-4a2e-b6fc-f5eff38dd7f8', this.state)
    .then(response => {
      console.log(response);
      this.hideHandler();
    })
  }

  hideHandler = () =>{
      this.setState({isActive: false})
  }
  
  render() {
    const { name, rating, domain } = this.state;
    return (
      <Container fluid className="container">
        {this.state.isActive ?
        <Form className="form" onSubmit={this.submitHandler}>
          
          <Form.Field>
            <label>Name</label>
            <input placeholder='Enter your name' type="text" name = "name" value = {name} onChange={this.changeHandler}/>
          </Form.Field>

          <fieldset className="starability-heartbeat" required>
            <legend>Basic star rating:</legend>
            <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" aria-label="No rating." defaultChecked={true}/>
            <input type="radio" id="rate1" name="rating" value="1" onChange={this.changeHandler} />
            <label htmlFor="rate1">1 star.</label>

            <input type="radio" id="rate2" name="rating" value="2" onChange={this.changeHandler} />
            <label htmlFor="rate2">2 stars.</label>

            <input type="radio" id="rate3" name="rating" value="3" onChange={this.changeHandler} />
            <label htmlFor="rate3">3 stars.</label>

            <input type="radio" id="rate4" name="rating" value="4" onChange={this.changeHandler} />
            <label htmlFor="rate4">4 stars.</label>

            <input type="radio" id="rate5" name="rating" value="5" onChange={this.changeHandler} />
            <label htmlFor="rate5">5 stars.</label>

            <span className="starability-focus-ring"></span>
          </fieldset>

          
          <Button color="blue" type='submit'>Submit</Button>
        </Form>
         : 
         <div>
         <h4>Thank you!</h4>
         <p>Thanks for submitting your review.</p>
         </div>
         }
      </Container>
    )
  }
}