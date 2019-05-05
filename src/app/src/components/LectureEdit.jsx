import React from 'react'
import {connect} from "react-redux";
import {IndexCardEdit, IndexCardSmall} from "./IndexCard";
import {save, getById} from "../repository/lectureRepository";
import {withRouter} from "react-router";
import {cardIsEmpty} from "../util/IndexCardUtil";

class LectureEdit extends React.Component {
    // currentId is not in state because it should not issue an rerender
    currentId = null

    constructor(props) {
        super(props);
        this.state = {currentIndexCard: 0}
    }

    getLectureId = (props=this.props) => props.match.params.lectureId || null

    componentDidMount() {
        this.currentId = this.getLectureId()
        if (this.currentId) {
            getById(this.currentId, ({name, description, indexCards}) => {
                this.nameInput.value = name
                this.descriptionInput.value = description
                this.props.loadIndexCards(indexCards)
            })
        }
    }

    componentDidUpdate(prevProps) {
        let currentNumIndexCards = this.props.indexCards.length;
        let previousNumIndexCards = prevProps.indexCards.length;

        if (previousNumIndexCards < currentNumIndexCards)
            this.setState({currentIndexCard: currentNumIndexCards - 1})
        else if (previousNumIndexCards > currentNumIndexCards)
            this.setState({currentIndexCard: Math.min(currentNumIndexCards - 1, this.state.currentIndexCard)})

        if (this.getLectureId(prevProps) !== this.getLectureId())
            this.currentId = this.getLectureId()
    }

    onAddCard() {
        window.scrollTo({top: 0})
        this.props.addIndexCard()
    }

    saveLecture() {
        save(this.currentId,
            this.nameInput.value, this.descriptionInput.value, this.props.indexCards.filter(it => !cardIsEmpty(it)),
            body => this.currentId === null ? this.props.history.push("/lecture/" + body) : null,
            (body) => console.error("Error on saving lecture:", body))
    }

    goBackToOverview() {
        this.props.resetIndexCards()
        this.props.history.push("/")
    }

    render() {
        const {indexCards, updateIndexCard, deleteIndexCard} = this.props;
        const {currentIndexCard} = this.state

        return <div>
            <div className={"sticky-navigation"}>
                <button onClick={this.goBackToOverview.bind(this)}>Zurück zur Übersicht</button>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 10fr", marginBottom: "24px", marginTop: "24px"}}>
                <label>Name der Lektion </label><input ref={ref => this.nameInput = ref}/>
                <label>Beschreibung (optional)</label><textarea ref={ref => this.descriptionInput = ref}/>
            </div>
            <div className={"lecture control-bar"}>
                <button onClick={this.saveLecture.bind(this)}>Lektion speichern</button>
            </div>
            <div className={"lecture current-index-card"}>
                <IndexCardEdit {...indexCards[currentIndexCard]} key={currentIndexCard + indexCards.length}
                               update={updateIndexCard(currentIndexCard)}
                               onSave={this.onAddCard.bind(this)}
                />
            </div>
            <div className={"lecture index-cards"}>
                {
                    indexCards.map((indexCard, index) =>
                        <IndexCardSmall onClick={() => this.setState({currentIndexCard: index},
                            () => window.scrollTo({top: 0, behavior: "smooth"}))}
                                        onClickDelete={deleteIndexCard(index)}
                                        isFocused={index === currentIndexCard}
                                        {...indexCards[index]}
                                        key={index}
                        />
                    )
                }
                <div className={"add-index-card"} onClick={this.onAddCard.bind(this)}>
                    <span className="glyphicon glyphicon-plus"/>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    indexCards: state.indexCards
})
const mapDispatchToProps = (dispatch) => ({
    addIndexCard: () => dispatch({type: "ADD_INDEX_CARD"}),
    deleteIndexCard: (index) => () => dispatch({type: "DELETE_INDEX_CARD", index}),
    updateIndexCard: (index) => (data) => dispatch({type: "UPDATE_INDEX_CARD", index, data}),
    loadIndexCards: (indexCards) => dispatch({type: "LOAD_INDEX_CARDS", indexCards}),
    resetIndexCards: () => dispatch({type: "RESET_INDEX_CARDS"})
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LectureEdit))