import React from 'react'
import { currencies, assetClasses, transactionTypes, assetTypes } from '../../utils/dropdownValues'
import FormItem from './index'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import { DateFormat } from '../../settings';
import _ from 'lodash'

export const valueInput = (values, setValues) => (
    <FormItem
        required={true}
        size='small'
        type='number'
        id='value'
        value={values.value}
        label={'Value'}
        handleChange={(e, val) => {
            setValues((prev) => ({ ...prev, value: !e ? val : e.target.value }))
        }}
        style={{ width: '100%' }} />
)

export const assetValueInput = (values, setValues) => (
    <FormItem
        required={true}
        size='small'
        type='number'
        id='assetValue'
        value={values.value}
        label={'Value'}
        handleChange={(e, val) => {
            setValues((prev) => ({ ...prev, value: !e ? val : e.target.value }))
        }}
        style={{ width: '100%' }} />
)

export const currencyInput = (values, setValues, field = 'currency') => (
    <FormItem
        required={true}
        size='small'
        inputType={'SELECT'}
        id={field}
        value={currencies.find(v => v.value === values[field]) || {}}
        label={'Currency'}
        selectItems={currencies}
        handleChange={(e, val) => {
            setValues((prev) => ({ ...prev, [field]: val || e.target.value }))
        }}
        style={{ width: '100%' }} />
)

export const remarkInput = (values, setValues) => (
    <FormItem
        size='small'
        id='remark'
        value={values.remark}
        label={'Note'}
        handleChange={(e) => {
            setValues((prev) => ({ ...prev, remark: e.target.value }))
        }}
        style={{ width: '100%' }} />
)

export const nameInput = (values, setValues) => (
    <FormItem
        required={true}
        size='small'
        id='name'
        value={values.name}
        label={'Name'}
        handleChange={(e) => {
            setValues((prev) => ({ ...prev, name: e.target.value }))
        }}
        style={{ width: '100%' }} />
)

export const dateInput = (values, setValues) => (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>

        <KeyboardDatePicker
            color='primary'
            autoOk
            label="Date"
            disableFuture
            rifmFormatter={val => val.replace(/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi, '')}
            refuse={/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi}
            rightArrowButtonProps={{
                size: 'small'
            }}
            format={DateFormat}
            value={values.date}
            style={{ width: '100%' }}
            onChange={(val) => setValues((prev) => ({ ...prev, date: val }))}
        />
    </MuiPickersUtilsProvider>
)

export const transactionInput = (values, setValues) => (
    <FormItem
        required={true}
        size='small'
        inputType={'SELECT'}
        id='transaction'
        value={transactionTypes.find(v => v.value === values.transaction_type) || {}}
        label={'Type'}
        selectItems={transactionTypes}
        handleChange={(e, val) => {
            setValues((prev) => ({ ...prev, transaction_type: val || e.target.value }))
        }}
        style={{ width: '100%' }} />
)

export const amountInput = (values, setValues) => (
    <FormItem
        required={true}
        size='small'
        type='number'
        id='amount'
        value={Math.abs(values.amount)}
        label={'Amount'}
        handleChange={(e, val) => {
            setValues((prev) => ({ ...prev, amount: parseFloat(!e ? val : e.target.value) }))
        }}
        style={{ width: '100%' }} />
)

export const assetTypeInput = (values, setValues) => (
    <FormItem
        required={true}
        size='small'
        inputType={'SELECT'}
        id={'assetType'}
        disabled={!values.asset_class}
        value={(_.find(assetTypes, (e) => e.class === values.asset_class) || { items: [] }).items.find(v => v.value === values.asset_type) || {}}
        label={'Type'}
        selectItems={(assetTypes.find(v => v.class === values.asset_class) || { items: [] }).items}
        handleChange={(e, val) => {
            setValues((prev) => ({ ...prev, asset_type: val || e.target.value }))
        }}
        style={{ width: '100%' }} />
)

export const assetClassInput = (values, setValues) => {
    let valueOfClass = assetClasses.find(v => v.value === values.asset_class) || {}
    return (
        <FormItem
            required={true}
            size='small'
            inputType={'SELECT'}
            id={'assetClass'}
            value={valueOfClass}
            selectItems={_.filter(assetClasses, _.matches({ type: valueOfClass.type })) || []}
            label={'Class'}
            handleChange={(e, val) => {
                setValues((prev) => ({ ...prev, asset_class: val || e.target.value }))
            }}
            style={{ width: '100%' }} />
    )
}
export const emailInput = (values, setValues) => (
    <FormItem
        required={true}
        size='small'
        id='email'
        disabled={true}
        value={values.email}
        label={'email'}
        handleChange={(e) => {
            setValues((prev) => ({ ...prev, email: e.target.value }))
        }}
        style={{ width: '100%' }} />
)

export const permissionDropDown = (values, setValues, array = []) => (
    <FormItem
        required={true}
        size='small'
        inputType={'SELECT'}
        id='access'
        value={array.find(v => v.value === values.access) || {}}
        handleChange={(e, val) => {
            setValues((prev) => ({ ...prev, access: val }))
        }}
        label={'Access'}
        selectItems={array}
        style={{ width: '100%' }}
    />
)
