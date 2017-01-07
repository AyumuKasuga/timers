import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../../css/App.css'
import {Bar} from './Bar'
import {TimerList} from './TimerList'
import {SettingsDrawer} from './SettingsDrawer'
import {AddDialog} from './AddDialog'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export class App extends Component {

    constructor(props){
        super(props);
        this.state = this.getDefaultState()
    }

    getDefaultState(){
        return {
            dialogIsOpen: false,
            drawerIsOpen: false,
            timers: [],
            editingCardId: null
        }
    }

    componentDidMount(){
        this.loadTimersList()
    }

    openAddDialog(){
        this.setState({dialogIsOpen: true})
    }

    closeAddDialog(){
        this.setState({
            dialogIsOpen: false,
            editingCardId: null
        })
    }

    saveTimersList(){
        localStorage.setItem("timers", JSON.stringify(this.state.timers))
    }

    loadTimersList(){
        let savedTimers = localStorage.getItem("timers")
        if(savedTimers){
            let timers = JSON.parse(savedTimers).map((item) => ({title: item.title, datetime: new Date(item.datetime)}))
            this.setState({timers: timers})
        }
    }

    submitAddDialog(data, cardId){
        let timers = this.state.timers;
        if(cardId !== null){
            timers[cardId] = data
            this.setState({editingCardId: null})
        }else{
            timers.push(data)
        }
        this.setState({timers: timers})
        this.saveTimersList()
        this.closeAddDialog()
    }

    timerRemoveHandler(key){
        let timers = this.state.timers;
        timers.splice(key, 1)
        this.setState({timers: timers})
        this.saveTimersList()
    }

    timerEditHandler(key){
        this.setState({editingCardId: key, dialogIsOpen: true})
    }

    toggleDrawer(){
        this.setState({drawerIsOpen: !this.state.drawerIsOpen})
    }

    render() {

        let editingCard
        if(this.state.editingCardId !== null){
            editingCard = this.state.timers[this.state.editingCardId]
        }else{
            editingCard = null
        }

        const bar = (
            <Bar
                addHandler={() => this.openAddDialog(this)}
                menuHandler={() => this.toggleDrawer(this)}
            />
        )

        return (
            <MuiThemeProvider>
                <div>
                    <AddDialog
                      isOpen={this.state.dialogIsOpen}
                      editingCard={editingCard}
                      editingCardId={this.state.editingCardId}
                      submitHandler={(data, cardId) => this.submitAddDialog(data, cardId)}
                      closeHandler={() => this.closeAddDialog(this)}
                    />
                    {bar}
                    <SettingsDrawer
                        menuHandler={() => this.toggleDrawer(this)}
                        isOpen={this.state.drawerIsOpen}>
                    </SettingsDrawer>
                    <TimerList
                        cards={this.state.timers}
                        timerRemoveHandler={(key) => this.timerRemoveHandler(key)}
                        timerEditHandler={(key) => this.timerEditHandler(key)}
                    />
                </div>
            </MuiThemeProvider>
        );
  }
}
