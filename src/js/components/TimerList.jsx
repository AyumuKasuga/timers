import React, { Component } from 'react';

import {TimerCard} from './TimerCard';
import {Card, CardText} from 'material-ui/Card';


export class TimerList extends Component{

    render(){
        let sortedCards = this.props.cards
        sortedCards.sort((a, b) => b.datetime - a.datetime)
        let cardList = sortedCards.map((card, i) => (
                    <TimerCard
                        removeHandler={() => this.props.timerRemoveHandler(i)}
                        editHandler={() => this.props.timerEditHandler(i)}
                        card={card}
                        key={i}
                        idx={i}
                    />
                )
        );
        if(cardList.length === 0){
            let style = {textAlign: "center", fontSize: "26px", color: "gray"}
            cardList = (
                <Card>
                    <CardText style={style}>
                        Emptiness...
                    </CardText>
                </Card>
            )
        }
        return (
            <div>
                {cardList}
            </div>
        );
    }
}
