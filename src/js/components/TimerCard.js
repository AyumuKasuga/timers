import React, { Component } from 'react'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'


export class TimerCard extends Component {

    constructor (props) {
        super(props)
        this.state = this.getDefaultState()
    }

    getDefaultState(){
        return {
            left: "calculating...",
            isPositive: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.card.datetime !== this.props.card.datetime){
            this.setState(this.getDefaultState())
        }else{
            this.updateTime()
        }
    }

    componentDidMount() {
        this.updateTime()
        let intervalId = setInterval(() => {
            this.updateTime();
        }, 1000);
        this.setState({intervalId: intervalId})
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    getTimedeltaText(src_timedelta){
        let timedelta_seconds_left = parseInt(src_timedelta / 1000, 10);
        if(timedelta_seconds_left < 0){
            timedelta_seconds_left *= -1
        }
        const timeunits = [
            {name: "day", name_plural: "days", seconds: 86400},
            {name: "hour", name_plural: "hours", seconds: 3600},
            {name: "minute", name_plural: "minutes", seconds: 60},
            {name: "second", name_plural: "seconds", seconds: 1},
        ]
        let text = ""
        for (let timeunit of timeunits){
            let units_count = parseInt(timedelta_seconds_left/timeunit.seconds, 10)
            if(units_count !== 0){
                let timeunit_text = units_count === 1 ? timeunit.name : timeunit.name_plural
                text += units_count + " " + timeunit_text + " "
                timedelta_seconds_left -= units_count * timeunit.seconds
            }
        }
        return text
    }

    webNotify(){
        let title = this.props.card.title
        Notification.requestPermission(function (result) {
            if (result === "granted") {
                new Notification("Timer '" + title + "' has expired!");
            }
        });
    }

    updateTime(){
        let left = this.props.card.datetime - new Date();
        let isPositive = left > 0
        if(this.state.isPositive && !isPositive && localStorage.getItem("webNotify") === "true"){
            this.webNotify()
        }

        let text = this.getTimedeltaText(left)
        if(text !== ""){
            if(isPositive){
                text += " left"
            }else{
                text += " since expiration"
            }
        }

        this.setState(
            {
                left: text,
                isPositive: isPositive
            }
        )
    }

    render(){
        let cardStyle = {}
        if(this.state.isPositive){
            cardStyle = {backgroundColor: '#E1F5FE'}
        }else{
            cardStyle = {backgroundColor: '#FCE4EC'}
        }

        return (
            <Card
                style={cardStyle}
                className="timercard">
                <CardHeader
                  title={this.props.card.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
            <CardText
                actAsExpander={true}>
                <span className="lefttext">{this.state.left}</span>
            </CardText>
            <CardActions
                expandable={true}>
                <FlatButton onTouchTap={this.props.editHandler} label="Edit" />
                <FlatButton onTouchTap={this.props.removeHandler} label="Remove" />
            </CardActions>
            </Card>
        );
    }
}
