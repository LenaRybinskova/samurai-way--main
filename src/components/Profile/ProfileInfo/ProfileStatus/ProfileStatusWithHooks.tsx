import React, {ChangeEvent, useState} from 'react';


export type ProfileStatusType = {
    status: string
    updateProfileStatusTC: (newStatus: string) => void
}
export const ProfileStatusWithHooks = (props: ProfileStatusType) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode=()=>{
        setEditMode(false)
        props.updateProfileStatusTC(status)
    }
    const onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {editMode
                ? <div><input onChange={onStatusChange} onBlur={deactivateEditMode} value={status} autoFocus></input>
                </div>
                : <div><span onDoubleClick={activateEditMode}>{props.status || 'no status'}</span></div>}
        </div>

    );

}

export default ProfileStatusWithHooks;


