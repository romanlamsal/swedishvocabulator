import React from 'react'
import {getById} from "../../repository/lectureRepository";
import _ from 'lodash'
import Swipeable from "../Swipeable";
import {IndexCardQuiz} from "../indexcards/IndexCardQuiz";
import {sendResult} from "../../repository/lectureResultRepository";

const YesNoQuizResult = ({correct, wrong, className, redoQuiz, goBack, ...props}) => <div {...props}
                                                                                  className={className}>
    <div className={"quiz yesno result"}>
        <div>Richtig:</div>
        <div>{correct.length}</div>
        <div>Falsch:</div>
        <div>{wrong.length}</div>
        <hr/>
        <hr/>
        <div>Ergebnis:</div>
        <div>{parseInt(100 * correct.length / (correct.length + wrong.length))}%</div>
        <button onClick={() => redoQuiz([...correct, ...wrong])}>
            Alle wiederholen
        </button>
        <button onClick={() => redoQuiz(wrong)}>
            Fehler wiederholen
        </button>
        <button style={{gridColumnStart: 1, gridColumnEnd: 3, width: "100%"}} onClick={goBack}>
            Zurück zur Übersicht
        </button>
    </div>
</div>

class YesNoQuiz extends React.Component {
    state = {unfinished: [], isTurned: false, correct: [], wrong: []}

    componentDidMount() {
        this.newRound(this.props.indexCards)
    }

    componentDidUpdate() {
        const {unfinished, correct, wrong} = this.state
        if (unfinished.length === 0 && (correct.length + wrong.length) !== 0)
            sendResult(wrong, correct)
    }

    newRound(indexCards) {
        this.setState({
            unfinished: _.shuffle(_.cloneDeep(indexCards)),
            isTurned: false, correct: [], wrong: []
        })
    }

    onKeyDown(ev) {
        switch (ev.key) {
            case "ArrowLeft":
                ev.preventDefault()
                return this.nextCard(false)
            case "ArrowRight":
                ev.preventDefault()
                return this.nextCard(true)
            case "Enter":
                ev.preventDefault()
                return this.turnCard()
            default:
                return
        }
    }

    turnCard() {
        const {isTurned} = this.state
        if (!isTurned) {
            this.setState({isTurned: true})
        }
    }

    nextCard(wasRight) { // boolean
        if (!this.state.isTurned) // safety first
            return

        const [currentCard, ...unfinished] = this.state.unfinished
        if (wasRight) {
            this.setState({unfinished, correct: [...this.state.correct, currentCard], isTurned: false})
        } else {
            this.setState({unfinished, wrong: [...this.state.wrong, currentCard], isTurned: false})
        }
    }

    onTouchDown(ev) {
        if (ev.target.classname === "sticky-navigation") {
            console.log("AAAAHA!")
        } else
            this.turnCard()
    }

    render() {
        const {unfinished, isTurned, correct, wrong} = this.state

        if (!unfinished.length)
            return <div className={"quiz yesno root "}>
                <YesNoQuizResult correct={correct} wrong={wrong} redoQuiz={this.newRound.bind(this)}
                    goBack={() => window.location = "/"/*TODO: make push to history*/}
                />
            </div>

        return <Swipeable tabIndex={1}
                          id={"foobarbaz"}
                          onClick={() => document.getElementById("foobarbaz").focus()}
                          className={"quiz yesno root"}
                          onKeyDown={this.onKeyDown.bind(this)}
                          onSwipeRight={() => this.nextCard(true)}
                          onSwipeLeft={() => this.nextCard(false)}
                          onTouchStart={this.onTouchDown.bind(this)}>
            <div className={"quiz yesno current-card" + (!isTurned ? " unturned" : "")}>
                <div onClick={this.turnCard.bind(this)}>
                    <IndexCardQuiz {...unfinished[0]} quiztype={"yesno"}/>
                </div>
                <div className={"buttongroup"}>
                    <button onClick={() => this.nextCard(false)}>Wusste ich nicht</button>
                    <button onClick={() => this.nextCard(true)}>Wusste ich</button>
                </div>
            </div>
            <div className={"sticky-navigation"} >
                <button onClick={() => this.setState({unfinished: [], wrong: [...wrong, ...unfinished]})}
                        style={{float: "right"}}
                >
                    Quiz abbrechen
                </button>
            </div>
        </Swipeable>
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false, data: []}
    }

    componentDidMount() {
        const lectureId = this.props.match.params.lectureId
        getById(lectureId, (body) => this.setState({data: body.indexCards, loaded: true}))
    }

    render() {
        const {loaded, data} = this.state
        if (loaded)
            return <YesNoQuiz indexCards={data}/>
        else
            return <Swipeable>Loading...</Swipeable>
    }
}