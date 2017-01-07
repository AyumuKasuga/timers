import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField'


export class AddDialog extends Component {

    constructor(props){
        super(props);
        this.state = this.getDefaultState()
    }

    getDefaultState(){
        return {
            isOpen: false,
            cardId: null,
            date: null,
            time: null,
            title: "",
            titleErrorText: null,
            datePickerErrorText: null,
            timePickerErrorText: null,
            saveButtonLabel: "Add",
            dialogTitle: "Add new timer"
        }
    }

    handleSubmit(){
        let fieldValidation = [
            {name: "title", empty: "", error: "titleErrorText"},
            {name: "date", empty: null, error: "datePickerErrorText"},
            {name: "time", empty: null, error: "timePickerErrorText"}
        ]

        let errors = {}
        let isValid = true
        for(let field of fieldValidation){
            if(this.state[field.name] === field.empty){
                errors[field.error] = "This field is required"
                isValid = false
            }else{
                errors[field.error] = null
            }
        }

        if(!isValid){
            this.setState(errors)
        }else{
            let datetime = new Date(
                this.state.date.getFullYear(),
                this.state.date.getMonth(),
                this.state.date.getDate(),
                this.state.time.getHours(),
                this.state.time.getMinutes(),
                0,
                0
            );
            this.props.submitHandler({
                title: this.state.title,
                datetime: datetime
            }, this.state.cardId)
        }
    }

    handleChangeField = (name, value) => {
        let fieldState = {}
        fieldState[name] = value
        this.setState(fieldState)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.editingCard){
            this.setState({
                time: nextProps.editingCard.datetime,
                date: nextProps.editingCard.datetime,
                title: nextProps.editingCard.title,
                cardId: nextProps.editingCardId,
                dialogTitle: "Edit timer",
                saveButtonLabel: "Save"
            })
        }else{
            this.setState(this.getDefaultState())
        }

        if(nextProps.isOpen === false){
            this.setState(this.getDefaultState())
        }

        this.setState({isOpen: nextProps.isOpen})
    }

    onRequestClose(){
        this.props.closeHandler()
    }

    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                onTouchTap={this.props.closeHandler}
            />,
            <FlatButton
                label={this.state.saveButtonLabel}
                primary={true}
                onTouchTap={() => this.handleSubmit(this)}
            />,
        ];

        const titleText = <TextField
            name="title"
            autoComplete="off"
            hintText="title"
            fullWidth={true}
            value={this.state.title}
            onChange={(event, value) => this.handleChangeField("title", value)}
            errorText={this.state.titleErrorText}
        />
        const datePicker = <DatePicker
            name="date"
            hintText="date"
            fullWidth={true}
            autoOk={true}
            value={this.state.date}
            onChange={(event, value) => this.handleChangeField("date", value)}
            errorText={this.state.datePickerErrorText}
        />
        const timePicker = <TimePicker
            format="24hr"
            name="time"
            hintText="time"
            fullWidth={true}
            value={this.state.time}
            onChange={(event, value) => this.handleChangeField("time", value)}
            errorText={this.state.timePickerErrorText}
        />

        return (
            <Dialog
              title={this.state.dialogTitle}
              modal={false}
              open={this.state.isOpen}
              onRequestClose={() => this.onRequestClose(this)}
              actions={actions}
            >
                {titleText}
                {datePicker}
                {timePicker}
            </Dialog>
        )
    }

}
