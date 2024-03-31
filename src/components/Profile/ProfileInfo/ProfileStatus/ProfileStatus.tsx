import React from 'react';


export type ProfileStatusType = {
    status: string
    updateProfileStatusTC: (newStatus: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false
    }

    activateEditMode=()=>{
        this.setState({
            editMode: true
        })
        // кастыльный метод заставить компон ререндериться
        /*        this.forceUpdate()*/
    }

    deactivateEditMode(){

    }


    render() {

        return (
            <div>
                {this.state.editMode ?
                    <div><input onChange={this.activateEditMode} onBlur={this.deactivateEditMode}
                                value={".."} autoFocus></input></div>
                    : <div><span onDoubleClick={this.activateEditMode}>{this.props.status}</span></div>}
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
