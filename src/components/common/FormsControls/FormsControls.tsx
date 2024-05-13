import {FC} from 'react';
import styles from './FormsControls.module.css'
import React from 'react'
import {WrappedFieldProps} from 'redux-form';

type FormControlProps = WrappedFieldProps & {
    tagName: 'textarea' | 'input'
}

const FormControl: FC<FormControlProps> = ({input, meta, tagName, ...props}) => {
    const hasError = meta.touched && meta.error;
    const Tag = tagName;

    return (
        <>
            <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
                <div>
                    <Tag {...input} {...props} />
                </div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </>
    );
};

export const Input = (props: any) => {
    return <FormControl {...props} tagName={"input"}/>
}

export const Textarea = (props: any) => {
    return<FormControl {...props} tagName={"textarea"}/>
}
