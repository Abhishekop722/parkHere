import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    FormLabel,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    MenuItem,
    RadioGroup,
    Radio,
    InputAdornment,
    IconButton,
    Select,
    FormControl,
    CircularProgress,
    InputLabel,
} from '@material-ui/core';
import clsx from 'clsx'
import { VisibilityOff, Visibility } from '@material-ui/icons'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import classNames from 'classnames'
import styles1 from './styles.less'
import { Autocomplete } from '@material-ui/lab';
import NumberFormat from 'react-number-format';
import PasswordStrengthBar from 'react-password-strength-bar';
const checkStyles = makeStyles({
    text: {
        fontSize: '14px',
    }
})

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
}
const FormItem = (props) => {
    const redux = useSelector(state => state.theme)
    const useStyles1 = makeStyles({
        root: {
            width: '100%',
            height: '3.5em',
            backgroundColor: '#006DEA',
            marginTop: '7%'
        },
        text: {
            fontSize: 'larger'
        },
        radio: {
            display: 'flex',
            flexDirection: 'row',
            color: 'white',
        }
    });
    const useStyles = makeStyles({
        root: {
            width: '100%',
            // marginTop: '1rem',
            flex: 1,
            textAlign: 'center'
        },
        rootPassword: {
            width: '100%',
            flex: 1,
            textAlign: 'center',
        },
        rootIconButton: {
            padding: 0
        },
        underline: {
            "&::before": {
                borderBottom: "1px solid hsl(216, 66%, 37%)"
            },
            "&:hover:not(.Mui-disabled):before": {
                borderBottom: "1px solid hsl(216, 66%, 37%)"
            },
            "&::after": {
                borderBottom: "1px solid hsl(216, 66%, 37%)"
            }
        },
        input: {
            "&:-webkit-autofill": {
                WebkitBoxShadow: props.backgroundFill ? "0 0 0 1000px #0B1229 inset" : "0 0 0 1000px #15224C inset",
                WebkitTextFillColor: '#fff'
            },
            "&:-webkit-text-stroke-color": "white",
            width: '100%',
            textAlign: 'left'
        },
        strength: {
            width: '100px',
            minHeight: '25px'
        }

    });
    const classes = useStyles()
    const buttonClass = useStyles1()
    const checkClass = checkStyles()
    const [values, setValues] = useState({ showPassword: false })
    const handleClickShowPassword = () => {
        setValues(() => (
            { showPassword: !values.showPassword }
        )
        );
    };
    const InputType = () => {
        const {
            inputType, id, label, handleChange, handleChangePassword,
            selectItems, defaultValue, className, value, radioOptions, email,
            onChange, variant, color, isMobile, onClick, loading, error, type, size, required,
            getOptionLabel, strength, autoComplete, disabled
        } = props
        switch (inputType) {
            case 'LOGINBUTTON':
                return (
                    <Button variant="contained" type='submit' color="primary" classes={{
                        root: buttonClass.root, // class name, e.g. `classes-nesting-root-x`
                        label: buttonClass.text, // class name, e.g. `classes-nesting-label-x`
                    }} onClick={onClick}>
                        {label}
                    </Button>
                )
            case 'CHECKBOX':
                return (
                    <FormControlLabel
                        classes={clsx(className, checkClass.text)}
                        control={
                            <Checkbox
                                checked={true}
                                onChange={onChange}
                                name={label}
                                color="primary"
                            />
                        }
                        label={label}
                    />
                )
            case 'PASSWORD':
                return (<>
                    <TextField
                        onChange={(e) => {
                            if (handleChange) {
                                handleChange(e)
                            }
                        }}
                        autoComplete={autoComplete}
                        name={id}
                        value={value}
                        error={error}
                        className={clsx(className, classes.rootPassword)}
                        InputProps={{
                            className: classNames(classes.underline, classes.input),
                            endAdornment: <InputAdornment> <IconButton
                                className={clsx(className, classes.rootIconButton)}
                                onClick={handleClickShowPassword}>{values.showPassword ? <Visibility /> :
                                    <VisibilityOff />}</IconButton> </InputAdornment>
                        }}
                        type={values.showPassword ? 'text' : 'password'}
                        label={label} color='primary'
                        hintText="Password"
                        floatingLabelText="Password"
                    />
                    {strength && <div className={classes.strength}>
                        {value && <PasswordStrengthBar password={email === value ? 'aaaa' : value} />}
                    </div>}
                </>
                )
            case 'SELECT':
                return (
                    <FormControl color='primary' className={className && className}>
                        {/* <InputLabel required={required} >{label}</InputLabel> */}
                        <Autocomplete
                            id={id}
                            disabled={disabled}
                            value={value}
                            options={selectItems}
                            closeIcon={false}
                            getOptionLabel={getOptionLabel ? getOptionLabel : (option) => option.label || ''}
                            // getOptionSelected={(option, val) => console.log(option, val)}
                            // inputValue={value}
                            style={{ width: '100%' }}
                            renderInput={(params) => <TextField error={error} required={required} {...params} label={label} />}
                            onChange={(event, newValue) => {
                                if (newValue && (newValue.value || newValue.id))
                                    handleChange && handleChange(null, newValue.value || newValue.id)
                            }}
                        />
                    </FormControl>
                )
            case 'RADIO':
                return (
                    <div className={className && className}>
                        <FormLabel>{label}</FormLabel>
                        <RadioGroup className={buttonClass.radio} aria-label={id} name={id} value={value || null}
                            onChange={onChange}>
                            {radioOptions.map(opt => {
                                return <FormControlLabel
                                    value={opt.radioValue}
                                    control={<Radio style={{ color: 'white' }} />}
                                    label={opt.label}
                                />
                            })}
                        </RadioGroup>
                    </div>
                )
            case 'BUTTON':
                return (
                    <Button onClick={onClick} className={className && className} variant={variant} disabled={loading}
                        color={color && color}> {loading && <CircularProgress size={10} style={{ marginRight: '10px', color: 'white' }} />} {label}</Button>

                )
            case 'TEXT':
                return (<div className={styles1.checkBox}>{label}</div>)
            default:
                return (type === 'number' ?
                    <TextField
                        value={value}
                        className={clsx(className, classes.root)}
                        name={id}
                        onChange={(e) => {
                            let val = parseFloat(e.target.value)
                            if (isNaN(val)) {
                                val = undefined
                            }
                            if (handleChange) {
                                handleChange(null, val)
                            }
                        }}
                        error={error}
                        defaultValue={defaultValue && defaultValue}
                        InputLabelProps={{
                            className: classes.input
                        }}
                        label={label}
                        size={size}
                        required={required}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                    :
                    <TextField
                        value={type === 'number' ? (isNaN(parseFloat(value)) ? value : parseFloat(value)) : value}
                        autoComplete={autoComplete ? autoComplete : 'off'}
                        name={id}
                        type={type}
                        className={clsx(className, classes.root)}
                        onChange={(e) => {
                            e.preventDefault()
                            e.persist()
                            if (handleChange) {
                                handleChange(e)
                            }
                        }}
                        error={error}
                        defaultValue={defaultValue && defaultValue}
                        InputLabelProps={{
                            className: classes.input
                        }}
                        disabled={disabled}
                        inputProps={{
                            className: classes.input
                        }}
                        // InputProps={{ className: classNames(classes.underline, classes.input) }}
                        label={label}
                        size={size}
                        required={required}
                    />)
        }
    }
    return (
        <FormLabel className={clsx(props.labelStyle?props.labelStyle:classes.root)} >
            {InputType()}
        </FormLabel>)
}
export default FormItem