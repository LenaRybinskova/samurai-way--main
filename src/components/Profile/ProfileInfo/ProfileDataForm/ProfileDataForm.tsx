import React from 'react';
import s from '../ProfilInfo.module.css'
import {ObtainedFormType} from '../../../..//components/Profile/ProfileInfo/ProfileInfo';
import {ContactsType, ResponseAPIProfileType} from '../../../../../src/redux/profileReducer';
import {createField, Input, Textarea} from '../../../common/FormsControls/FormsControls';
import {required} from '../../../../../src/utils/validators/validators';
import {InjectedFormProps, reduxForm} from 'redux-form';


export type ProfilePropsType = {
    profile: ResponseAPIProfileType | null
    isOwner: boolean
    onSubmit: (formData: ObtainedFormType) => void
}

//зачем дважды ProfileDataFormType
export const ProfileDataForm: React.FC<InjectedFormProps<ObtainedFormType, ProfilePropsType> & ProfilePropsType> = ({
                                                                                                                        handleSubmit,
                                                                                                                        error,
                                                                                                                        profile,
                                                                                                                    }) => {
    console.log('ОШИБКА ProfileDataForm', error)
    console.log('что в profile', profile)
    return (

        <div className={s.profileInfo}>
            <form onSubmit={handleSubmit}>
                <div>{<button type={'submit'} className={s.editProfileButton}>сохранить</button>}</div>
                {error && <div>{error}</div>}

                <div className={s.fullNameForm}><b>Full name: </b><span className={s.fullNameFormDescription}>{createField('Full name', 'fullName', [required], Input)}</span></div>
                <div className={s.fullNameForm}><b>Looking for a job:</b>
                    <span>{createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}</span>
                </div>
                <div  className={s.fullNameForm}><b>Description:</b> {profile?.lookingForAJob &&
                    <div>{createField('Looking for a job Description', 'lookingForAJobDescription', [required], Input)}</div>}</div>
                {<div><b>About me:</b>
                    {createField('About me', 'aboutMe', [required], Textarea)}
                </div>}
                <div><b>Contacts:</b>
                    <div>{Object.keys(profile?.contacts as ContactsType).map((key: string) => {
                        return (
                            <div className={`${s.contacts} + ${s.fullNameForm}`}>
                                <b>{key}</b>: <span>{createField(key, 'contacts.' + key, [], Input)}</span></div>)
                    })}</div>
                </div>
            </form>
        </div>
    )
}

export const ReduxProfileDataForm = reduxForm<ObtainedFormType, ProfilePropsType>({
// пишем уникальное название формы
    form: 'edit-profile'
})(ProfileDataForm)