import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps}) => {
    return (
        <div className="group">
            <input className='form-input' {...otherProps} />
            {label && <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>Display name</label>}
        </div>
    )
}

export default FormInput
