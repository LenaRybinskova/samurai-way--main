import React, {FC, FunctionComponent} from 'react';
import styles from './FormsControls.module.css'
import {Field, WrappedFieldProps} from 'redux-form';


type FormControlProps = WrappedFieldProps & { tagName: 'textarea' | 'input' }

const FormControl: FC<FormControlProps> = ({input, meta: {touched, error}, tagName, ...props}) => {

    const hasError = touched && error;
    const Tag = tagName;

    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <div className={styles.formControlWrapper}>
                <Tag {...input} {...props} className={Tag === 'textarea' ? styles.textarea : styles.input}/>
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
};

export const Input: FC<WrappedFieldProps> = (props: WrappedFieldProps) => {
    return <FormControl {...props} tagName={'input'}/>
}

export const Textarea: FC<WrappedFieldProps> = (props: WrappedFieldProps) => {
    return <FormControl {...props} tagName={'textarea'}/>
}

export const createField = (placeholder: string | null, name: string, validators: ((value: string) => void)[] | [], component: FunctionComponent<WrappedFieldProps>, props = {}, text = '') => {
    return (
        <Field component={component} name={name} placeholder={placeholder} validate={validators}{...props} />
    )
}


//--------------------------------------------------------------------------------
/*
export const required = (value: string) => (value || typeof value === 'number' ? undefined : 'Required');

export const maxLength = (max: number) => (value: string) => value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min: number) => (value: string) => value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const Element = (Element: string | React.FC): React.FC<RenderFieldPropsType> => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <Element {...input} {...props}
                className={`${Element === 'textarea' ? styles.textarea : styles.input} ${hasError ? styles.error : ""}`}/>
            <div>
                { hasError && <span style={{color: 'red', fontSize: '14px'}}> { meta.error } </span> }
            </div>
        </div>
    );
};

export const Textarea = Element('textarea');
export const Input = Element('input');

type RenderFieldPropsType = {
    input: string
    label: string
    type: string
    meta: {
        touched: boolean
        error: string
        warning: string
    }
}*/
