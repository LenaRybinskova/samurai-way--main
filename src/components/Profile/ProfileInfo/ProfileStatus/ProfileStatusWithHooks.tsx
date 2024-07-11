import React, {ChangeEvent, useEffect, useState} from 'react';


export type ProfileStatusType = {
    status: string
    updateProfileStatusTC: (newStatus: string) => void
}
export const ProfileStatusWithHooks = (props: ProfileStatusType) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateProfileStatusTC(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {editMode
                ? <span><input onChange={onStatusChange} onBlur={deactivateEditMode} value={status} autoFocus></input>
                </span>
                : <div><span><b>Status: </b></span><span onDoubleClick={activateEditMode}>{props.status || 'no status'}</span>
                </div>}
        </div>

    );

}

export default ProfileStatusWithHooks;


