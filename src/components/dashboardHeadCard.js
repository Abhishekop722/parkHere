import React from 'react';
import clsx from 'clsx'
import { Divider, Typography, Tooltip } from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';

export default function HeadCard(props) {
    const { classes, data, isOverviewTab, headClass, isMobile } = props
    return (
        <div className={clsx({ [classes.row]: true, [classes.details]: true, [classes.overViewDetails]: isOverviewTab })}>
            {`${data.currentValue}` !== undefined &&
                <>
                    <div className={classes.newCard}>
                        <Typography variant={isOverviewTab ? 'subtitle2' : 'caption'} className={classes.title} color="textSecondary">
                            {data.currentValueText || `Current Value`}
                            <Tooltip title='Asset value as of the most recent valuation date' enterTouchDelay={-300}>
                                <HelpOutline className={classes.tooltipIcon} />
                            </Tooltip>
                        </Typography>
                        <Typography variant={isOverviewTab ? 'subtitle2' : 'body1'} color='textPrimary'>
                            {data.currentValue}
                        </Typography>
                    </div>
                    <Divider orientation='vertical' flexItem className={classes.divider} />
                </>}
            {data.investedAmount !== undefined &&
                <>
                    <div className={classes.newCard}>
                        <Typography variant={isOverviewTab ? 'subtitle2' : 'caption'} className={classes.title} color="textSecondary">
                            {data.investedAmountText || `Invested Amt.`}
                            <Tooltip title='Sum of all deposits minus all withdrawals made into/from the asset' enterTouchDelay={-300}>
                                <HelpOutline className={classes.tooltipIcon} />
                            </Tooltip>
                        </Typography>
                        <Typography variant={isOverviewTab ? 'subtitle2' : 'body1'} color='textPrimary'>
                            {data.investedAmount}
                        </Typography>
                    </div>
                    <Divider orientation='vertical' flexItem className={classes.divider} />
                </>}
            {data.firstDeposit !== undefined &&
                <>
                    <div className={classes.newCard}>
                        <Typography variant={isOverviewTab ? 'subtitle2' : 'caption'} className={classes.title} color="textSecondary">
                            {data.firstDepositText || `First Deposit`}
                            <Tooltip title='Date of the first deposit transaction into the asset' enterTouchDelay={-300}>
                                <HelpOutline className={classes.tooltipIcon} />
                            </Tooltip>
                        </Typography>
                        <Typography variant={isOverviewTab ? 'subtitle2' : 'body1'} color='textPrimary'>
                            {data.firstDeposit}
                        </Typography>
                    </div>
                    <Divider orientation='vertical' flexItem className={classes.divider} />
                </>}
            {data.xrrReturn !== undefined &&
                <>
                    <div className={classes.newCard} style={(!isOverviewTab && !isMobile) ? { maxWidth: '100px' } : {}} >
                        <Typography variant={isOverviewTab ? 'subtitle2' : 'caption'} className={classes.title} color="textSecondary">
                            MWR
          <Tooltip title='Money Weighted Return (Annualized)' enterTouchDelay={-300}>
                                <HelpOutline className={classes.tooltipIcon} />
                            </Tooltip>
                        </Typography>
                        <Typography className={classes[headClass.xrrClass]} variant={isOverviewTab ? 'subtitle2' : 'body1'}>
                            {data.xrrReturn}
                        </Typography>
                    </div>
                    <Divider orientation='vertical' flexItem className={classes.divider} />
                </>}
            {data.twrReturn !== undefined &&
                <>
                    <div className={classes.newCard} style={(!isOverviewTab && !isMobile) ? { maxWidth: '100px' } : {}} >
                        <Typography variant={isOverviewTab ? 'subtitle2' : 'caption'} className={classes.title} color="textSecondary">
                            TWR
          <Tooltip title='Time Weighted Return (Annualized)-Not implemented yet' enterTouchDelay={-300}>
                                <HelpOutline className={classes.tooltipIcon} />
                            </Tooltip>
                        </Typography>
                        <Typography variant={isOverviewTab ? 'subtitle2' : 'body1'} color='textPrimary'>
                            {data.twrReturn}
                        </Typography>
                    </div>
                    <Divider orientation='vertical' flexItem className={classes.divider} />
                </>}
            {data.totalGain !== undefined && <div className={classes.newCard}>
                <Typography variant={isOverviewTab ? 'subtitle2' : 'caption'} className={classes.title} color="textSecondary">
                    {data.totalGainText || 'Total Gain'}
                    <Tooltip title='Absolute gain (or loss) in monetary terms.' enterTouchDelay={-300}>
                        <HelpOutline className={classes.tooltipIcon} />
                    </Tooltip>
                </Typography>
                <Typography className={classes[headClass.gainClass]} variant={isOverviewTab ? 'subtitle2' : 'body1'} color='textPrimary'>
                    {data.totalGain}
                </Typography>
            </div>}
        </div>
    );
}
