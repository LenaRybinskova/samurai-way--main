import React from 'react';
import {Contact, ContactsKeys, ObtainedFormType} from '../../../..//components/Profile/ProfileInfo/ProfileInfo';
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
export const ProfileDataForm: React.FC<InjectedFormProps<ObtainedFormType, ProfilePropsType> & ProfilePropsType> = ({handleSubmit, profile, isOwner}) => {
    return (
        <form onSubmit={handleSubmit}>

            <div>{<button onClick={() => {
            }}>save</button>}</div>
            <div>Full name:{createField('Full name', 'fullName', required, Input)}</div>
            <div>Looking for a job:
                {createField('', 'lookingForAJob', required, Input, {type: 'checkbox'})}
            </div>
            {profile?.lookingForAJob && <div>
                {createField('Looking for a job Description', 'lookingForAJobDescription', required, Input)}
            </div>}
            {<div>
                {createField('About me', 'aboutMe', required, Textarea)}
            </div>}
            {/*<div>
                My professional
                skills:{createField('My professional skills ', 'myProfessionalSkills', required, Textarea)}
            </div>*/}
            <div>Contacts:
                <div>{Object.keys(profile?.contacts as ContactsType).map((key: string) => {
                    return profile != null &&
                        <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as ContactsKeys]}/>
                })}</div>
            </div>
        </form>
    )
}

export const ReduxProfileDataForm = reduxForm<ObtainedFormType, ProfilePropsType>({
// пишем уникальное название формы
    form: 'edit-profile'
})(ProfileDataForm)