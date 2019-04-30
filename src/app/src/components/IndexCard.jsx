import React from "react";
import _ from "lodash";
import request from "request";
import {WORDTYPES} from "./Lecture";
import {AdjectiveCard, FreeTextCard, NounCard, VerbCard} from "./SwedishCard";

function getWordTypeComponent(wordtype) {
    switch (wordtype) {
        case WORDTYPES.FREE_TEXT:
            return FreeTextCard
        case WORDTYPES.VERB:
            return VerbCard
        case WORDTYPES.ADJECTIVE:
            return AdjectiveCard
        case WORDTYPES.NOUN:
            return NounCard
    }
}

export class IndexCard extends React.Component {
    constructor(props) {
        super(props)
        this.defaultState = _.cloneDeep(props)
    }

    setState(state, callback) {
        this.props.update({
            german: this.props.german,
            wordtype: this.props.wordtype,
            swedish: this.props.swedish,
            ...state
        })
    }

    autofill() {
        let identifyingWord = this.props.swedish[getWordTypeComponent(this.props.wordtype).IDENTIFIER];

        if (!identifyingWord)
            return

        identifyingWord = identifyingWord.replace(/^att /, "")
            .replace(/^en /, "")
            .replace(/^ett /, "")

        let urlWithParams = "http://localhost:4000/" + identifyingWord + "?wordtype=" + this.props.wordtype;
        console.log("Fetch from", urlWithParams)
        return request(urlWithParams, (error, response, body) => {
            console.log("Response code:", response.statusCode)
            console.log("Response body:", body)
            if (response.statusCode === 200)
                this.setState({swedish: JSON.parse(body).data})
        });
    }

    handleWordtypeChange(ev, wordtype) {
        let newWordType = ev.target.value || wordtype
        if (newWordType === this.props.wordtype)
            return

        this.setState({wordtype: newWordType, swedish: {}})
    }

    handleChangeInSwedish(field, ev) {
        const swedish = JSON.parse(JSON.stringify(this.props.swedish))
        swedish[field] = ev.target.value

        this.setState({swedish})
    }

    saveCard() {
        this.props.onSave()
    }

    handleShortcuts(ev) {
        if (ev.ctrlKey) {
            if (ev.key === "Enter") {
                ev.preventDefault()
                this.autofill()
            }
            if (ev.key === "s") {
                ev.preventDefault()
                this.saveCard()
            }
        } else if (ev.altKey) {
            if (ev.key === "v") {
                ev.preventDefault()
                this.handleWordtypeChange({target: {value: WORDTYPES.VERB}})
            }
            if (ev.key === "a") {
                ev.preventDefault()
                this.handleWordtypeChange({target: {value: WORDTYPES.ADJECTIVE}})
            }
            if (ev.key === "n") {
                ev.preventDefault()
                this.handleWordtypeChange({target: {value: WORDTYPES.NOUN}})
            }
        }
    }

    componentDidMount() {
        if (this.focusInput)
            this.focusInput.focus({ //simulate autofocus without the scrolling
                preventScroll: true
            })
    }

    render() {
        const {german, wordtype, swedish} = this.props
        if (!Boolean(wordtype))
            return <div/>

        const SwedishComponent = getWordTypeComponent(wordtype);

        return <div tabIndex={1} onKeyDown={this.handleShortcuts.bind(this)}>
            <select value={wordtype} onChange={this.handleWordtypeChange.bind(this)}>
                <option value={WORDTYPES.FREE_TEXT}>Freitext</option>
                <option value={WORDTYPES.VERB}>Verb</option>
                <option value={WORDTYPES.NOUN}>Substantiv</option>
                <option value={WORDTYPES.ADJECTIVE}>Adjektiv</option>
            </select>
            <div/>
            <div className={"index-card " + wordtype.toLowerCase()}>
                <div className="index-card german">
                    <label>Wort/Phrase:</label><input value={german} ref={ref => this.focusInput = ref}
                                                      onChange={ev => this.setState({german: ev.target.value})}/>
                </div>
                <hr/>
                <SwedishComponent className={"index-card swedish"}
                                  onChange={field => ev => this.handleChangeInSwedish(field, ev)}
                                  data={swedish}
                />
            </div>
            <button onClick={this.autofill.bind(this)}>Automatisch befüllen</button>
            <button onClick={() => this.setState({...this.defaultState})}>Zurücksetzen</button>
        </div>
    }
}

export const IndexCardSmall = ({german, swedish, wordtype, isFocused, onClick, onClickDelete}) => <div
    className={"index-card " + wordtype.toLowerCase() + " small" + (isFocused ? " focused" : "")}
    tabIndex={1} onClick={onClick}
>
    <div><p>{german}</p></div>
    <hr/>
    <div><p>{swedish[getWordTypeComponent(wordtype).IDENTIFIER]}</p></div>
    <span className={"delete-overlay"} onClick={onClickDelete}>
        <span className={"glyphicon glyphicon-remove"}/>
    </span>
</div>