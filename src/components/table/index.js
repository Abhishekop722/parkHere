import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Paper,
    CircularProgress,
    TableSortLabel,
    TableBody,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Link
} from '@material-ui/core';
import { CloudUpload, CloudDownload } from '@material-ui/icons'
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import moment from 'moment'
import _ from 'lodash'
import DialogBox from '../dialogBox';

const datesFields = ['date', 'valid_from']

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    container: {
        maxHeight: 'calc(100% - 3rem)',
        minHeight: '100px',
        borderRadius: '4px',
        backgroundColor: theme.palette.primary.dark,
    },
    head: {
        backgroundColor: theme.palette.primary.main
    },
    marginRight: {
        marginRight: '10px'
    },
    secondaryBtn: {
        backgroundColor: theme.palette.secondary.main,
        padding: '2px 10px',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem 0'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    clickableRow: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: `${theme.palette.primary.main} !important`
        },
        '&:focus': {
            backgroundColor: `${theme.palette.primary.main} !important`
        },
        '&:active': {
            backgroundColor: `${theme.palette.primary.main} !important`
        }
    },
    btnWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        padding: '0.5rem 1rem',
        margin: '0 0 0.5rem 0'
    }
}));

function descendingComparator(a, b, orderBy) {
    if (datesFields.includes(orderBy)) {
        if (moment(b[orderBy]).isBefore(moment(a[orderBy]))) {
            return -1;
        }
        if (moment(b[orderBy]).isAfter(moment(a[orderBy]))) {
            return 1;
        }
    }
    else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.base.main,
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
    root: {
        borderBottom: 'none',
        borderRight: `1px solid #006dea4f`
    },
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function EnhancedTableHead(props) {
    const { classes, columns, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.head}>
            <TableRow>
                {columns.map((column) => (
                    <StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sortDirection={orderBy === column.id ? order : false}
                    >{!column.sorter ? column.label :
                        <TableSortLabel
                            active={column.sorter}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={createSortHandler(column.id)}
                        >
                            {column.label}
                            {orderBy === column.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export default function TableComp(props) {
    const { columns: propsColumns, loading, dataSource = [], onTemplate, defaultRow = [], onRowClick, maxHeight } = props
    const classes = useStyles();
    const [showBox, setShowBox] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const { isMobile, ownerUser } = useSelector(state => ({
        isMobile: state.theme.isMobile,
        ownerUser: state.global.ownerUser,
    }))

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleBox = (val = false) => {
        setShowBox(() => val)
    }

    const columns = _.filter(propsColumns, (val) => {
        if (val.id === 'actions') {
            if (ownerUser?.permission?.View !== true)
                return val
        }
        else
            return val
    })
    return (
        <Paper className={classes.root} elevation={false}>
            <DialogBox
                dialogTitle={'Instructions'}
                confirmBoxopen={showBox}
                handleDialogClose={() => handleBox(false)}
                text={<div>Please check CSV format before uploading. You can download a template to complete <Link style={{ cursor: 'pointer' }} onClick={onTemplate} download >here</Link>.</div>}
                okBtnComp={<Button
                    onClick={() => handleBox(true)}
                    component="label"
                    color='primary'
                    style={{ marginLeft: '5px' }}
                >
                    Upload
                    <input
                        type="file"
                        hidden
                        onChange={(e) => {
                            props.onCsvUpload(e)
                            handleBox(false)
                        }}
                    />
                </Button>}
                cancelText={'Cancel'} />
            <div className={classes.btnWrapper}>
                {props.onCsvDownload && <Button
                    color="default"
                    className={classes.button}
                    startIcon={props.csvDownloadLoader ? <CircularProgress size={20} /> : <CloudDownload />}
                    onClick={props.onCsvDownload}
                >
                    Download CSV
                </Button>}
                {props.onCsvUpload && <Button
                    onClick={() => handleBox(true)}
                    component="label"
                    disabled={ownerUser && ownerUser.permission?.View}
                    className={classes.button}
                    startIcon={props.csvUploadLoader ? <CircularProgress size={20} /> : <CloudUpload />}
                >
                    Upload CSV
                </Button>}

            </div>
            <TableContainer className={classes.container}
                style={maxHeight ? { maxHeight: maxHeight } : {}}
            >
                <Table size={isMobile ? 'small' : 'medium'} stickyHeader aria-label="sticky table">
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        columns={defaultRow.length ? propsColumns : columns}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={dataSource.length}
                    />
                    {loading ?
                        <div className={classes.loading}><CircularProgress /> </div> :
                        <TableBody>
                            {[
                                <StyledTableRow
                                    tabIndex={-1}
                                >
                                    {defaultRow.map((column, i) => {
                                        return (
                                            <StyledTableCell key={column.key || column.id} align={column.align}>
                                                {column.render ? column.render(i) : column.value || ''}
                                            </StyledTableCell>
                                        );
                                    })
                                    }
                                </StyledTableRow>,
                                stableSort(dataSource, getComparator(order, orderBy)).map((row, index) => {
                                    return (
                                        <StyledTableRow
                                            onClick={() => {
                                                if (onRowClick) {
                                                    onRowClick(row, index);
                                                }
                                            }}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.code}
                                            className={clsx({ [classes.clickableRow]: onRowClick })}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <StyledTableCell key={column.id} align={column.align}>
                                                        {column.render ? column.render(value, row, index) : value}
                                                    </StyledTableCell>
                                                );
                                            })}
                                        </StyledTableRow>
                                    );
                                })
                            ]}
                        </TableBody>
                    }
                </Table>
            </TableContainer>
        </Paper>
    );
}
