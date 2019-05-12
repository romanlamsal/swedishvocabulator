import React from 'react'
import {get} from '../repository/lectureRepository'
import {withRouter} from "react-router";

const LectureMeta = ({name, description, onClickEdit, onClickStart}) => <div className={"lecture-meta"}>
    <div>
        <div>{name}</div>
        <div>{description}</div>
    </div>
    <div className={"lecture-meta buttongroup"}>
        <button onClick={onClickStart}>Lektion starten</button>
        <button onClick={onClickEdit}>Editieren</button>
    </div>
</div>

class LectureOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lectures: []}
    }

    snackMeta = {name: "Snack: 20", description: "20 zufällige Vokabeln aus allen Lektionen.", id: "snack"}

    componentDidMount() {
        get(this.loadLectures.bind(this),
            (errorBody) => console.error("ERROR:", errorBody))
    }

    loadLectures(lectureMetas) {
        if (lectureMetas.length > 0) {
            this.setState({lectures: [this.snackMeta, ...lectureMetas]})
        }
    }

    onClickEdit = (lectureMeta) => () => this.props.history.push("/lecture/" + lectureMeta.id)
    onClickStart = (lectureMeta) => () => this.props.history.push("/quiz/yesno/" + lectureMeta.id)

    render() {
        const {lectures} = this.state
        return <div className={"lecture-overview"}>
            <div>Lektionen</div>
            <div className={"lecture-meta"}>
                <button onClick={() => this.props.history.push("/lecture")}>Lektion hinzufügen</button>
            </div>
            {
                lectures.map((metaInfo, i) => <LectureMeta {...metaInfo} key={i}
                                                           onClickEdit={this.onClickEdit(metaInfo)}
                                                           onClickStart={this.onClickStart(metaInfo)}/>)
            }
        </div>
    }
}

export default withRouter(LectureOverview)