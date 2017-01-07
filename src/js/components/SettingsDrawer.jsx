import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

export class SettingsDrawer extends Component {

    constructor(props){
        super(props);
        this.state = this.getDefaultState()
    }

    getDefaultState(){
        return {
            webNotify: this.getWebNotifyStatus()
        }
    }

    getWebNotifyStatus(){
        if(localStorage.getItem("webNotify") === "true"){
            return true
        }else{
            return false
        }
    }

    setWebNotifyStatus = (event, state) => {
        Notification.requestPermission(function (result) {
            if (result === "granted") {
                console.log("okay")
            }else{
                console.log("why you did this???")
            }
        });
        localStorage.setItem("webNotify", state)
        this.setState({webNotify: state})
    }

    render(){
        const notifyToggle = (
            <Toggle toggled={this.state.webNotify} onToggle={this.setWebNotifyStatus}/>
        )

        return (
            <Drawer
                docked={false}
                onRequestChange={this.props.menuHandler}
                open={this.props.isOpen}>
                <List>
                    <Subheader>General settings</Subheader>
                    <ListItem primaryText="Web Notifications" rightToggle={notifyToggle} />
                </List>
            </Drawer>
        );
    }
}
