import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'


export class Bar extends Component{

    render(){
        return <AppBar
            title="Timers"
            onLeftIconButtonTouchTap={this.props.menuHandler}
            iconElementRight={
                <FlatButton label="Add" onTouchTap={this.props.addHandler}></FlatButton>
            }
        />
    }
}
