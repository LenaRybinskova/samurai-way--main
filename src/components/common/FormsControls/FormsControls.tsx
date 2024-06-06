import React, {FC, FunctionComponent} from 'react';
import styles from './FormsControls.module.css'
import {Field, WrappedFieldProps} from 'redux-form';


type FormControlProps = WrappedFieldProps & {
    tagName: 'textarea' | 'input'
}

const FormControl: FC<FormControlProps> = ({input, meta:{touched,error }, tagName, ...props}) => {
    const hasError = touched && error;
    const Tag = tagName;

    return (
        <>
            <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
                <div>
                    <Tag {...input} {...props} />
                </div>
                {hasError && <span>{error}</span>}
            </div>
        </>
    );
};

export const Input: FC<WrappedFieldProps> =(props: WrappedFieldProps) => {
    return <FormControl {...props} tagName={'input'}/>
}

export const Textarea = (props: FormControlProps) => {
    return <FormControl {...props} tagName={'textarea'}/>
}

export const createField = (placeholder: string | null, name: string, validators: (value: string) => void, component: FunctionComponent<WrappedFieldProps>, props={}, text="") => {
    return (
        <div>
            <Field
                component={component}
                name={name}
                placeholder={placeholder}
                validate={[validators]}
                {...props}
            />
        </div>
    )
}


