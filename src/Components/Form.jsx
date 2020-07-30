import React, { Component } from 'react'

export default class Form extends Component {

    state = {
        username: "", 
        password: "",
        manageable_fund: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.submitFunction(this.state)
    }
    
    
    render() {
        let {username, password, manageable_fund} = this.state
        return (
            <div class="login-page">
                <form onSubmit={this.handleSubmit}>
                    <div class="row">
                                
                        <div class="col-md-3"></div>
                        <div class="col-md-5">
                            <div class="form-box">
                                <div class="card text-dark bg-light mb-3">
                                    <h5 class="card-title">{this.props.formName}</h5>

                                    <p class="card-text">
                                        
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}/>
                                    </p>

                                    <p class="card-text">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
                                    </p>

                                    <p class="card-text">
                                        {this.props.formName === "Register"? <div>
                                            <label >Manageable Fund:</label>
                                            <input type="number" autoComplete="off" name="manageable_fund" value={manageable_fund} onChange={this.handleChange}/>
                                        </div> :null}
                                    </p>

                                    <button class="btn btn-primary">
                                        <input type="submit" value="Submit"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

                    
