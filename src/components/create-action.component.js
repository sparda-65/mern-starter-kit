import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import { Link } from 'react-router-dom';


export default class CreateAction extends Component{

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeObjectif = this.onChangeObjectif.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeStatut = this.onChangeStatut.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    
        this.state = {
          username: '',
          description: '',
          objectif: '',
          date: new Date(),
          statut: true,
          users: []
        }
    }

    componentDidMount(){
        this.setState({
            username: 'test user',
            users: ['test1']
          })

    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeObjectif(e){
        this.setState({
            objectif: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onChangeStatut(e){
        this.setState({
            statut: e.target.checked
        });
    }

    onSubmit(e){
        e.preventDefault();

        const action = {
            username: this.state.username,
            description: this.state.description,
            objectif: this.state.objectif,
            date: this.state.date,
            statut: this.state.statut
        }

        console.log(action);
        window.location = '/';
    }
    
    render(){
        return(
            <div>
            <h3>Create New Action Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                        this.state.users.map(function(user) {
                        return <option 
                            key={user}
                            value={user}>{user}
                            </option>;
                        })
                    }
                </select>
                </div>
                <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
                </div>
                <div className="form-group">
                <label>Objectif : </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.objectif}
                    onChange={this.onChangeObjectif}
                    />
                </div>
                <div className="form-group">
                <label>Date: </label>
                <div>
                    <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    />
                </div>
                </div>
                <div className="form-group">
                <label>Statut: </label>
                <input 
                    type="checkbox"
                    className="form-control"
                    checked={this.state.statut}
                    onChange={this.onChangeStatut}
                    />
                </div>

                <div className="form-group">
                <input type="submit" value="Create Action Log" className="btn btn-primary" />
                </div>
            </form>
            </div>
        )
    };

}