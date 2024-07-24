import React from 'react';


export type ProfileStatusType = {
    status: string
    updateProfileStatusTC: (newStatus: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({editMode: true})
        // кастыльный метод заставить компон ререндериться
        /*        this.forceUpdate()*/
    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateProfileStatusTC(this.state.status)
    }

    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        let a = prevProps
        let b = prevState
        let c = this.state //текущий state
        let d = this.props //текущие пропсы

        //нельзя внутри componentDidUpdate вызывать setState, будет зацикленность, прогр сломается
        // если необх исп setState, то только внутри какого условия иф-элс
        /*        this.setState({
                    status:this.props.status
                })*/
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
        console.log('componentDidUpdate')
    }

    render() {
        return (
            <div>
                {this.state.editMode ?
                    <div><input onChange={this.onStatusChange} onBlur={this.deactivateEditMode}
                                value={this.state.status} autoFocus></input></div>
                    : <div><span onDoubleClick={this.activateEditMode}>{this.props.status || 'no status'}</span></div>}
            </div>

        );
    }
}

export default ProfileStatus;


//функциональная компонента
/*
import React, {useState} from 'react';



export type ProfileStatusType = {
    status: string
    updateProfileStatusTC:(newStatus:string)=>void
}

const ProfileStatus = (props: ProfileStatusType) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState("стартовый статус")


    const statusHandler=()=>{
        setEditMode(true)
    }
    const submitHandler=()=>{
        setEditMode(false)
        console.log("перед сабмитом", status)
        props.updateProfileStatusTC(status)
    }

    const onChangeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {editMode ?
                <div><input onChange={onChangeHandler} onBlur={submitHandler} value={status}></input></div>
                : <div><span onClick={statusHandler}>{props.status}</span></div>}
        </div>

    );
};

export default ProfileStatus;*/


