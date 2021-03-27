import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from 'react-document-title'

const Menu = React.lazy(() => import('../../../components/menu'));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  minusMargin: {
    margin: '0 -1rem'
  }
}));

export default function Dashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { isMobile } = useSelector(state => ({
    isMobile: state.theme.isMobile,
    currentUser: state.global.currentUser
  }))

  return (<DocumentTitle title='PH | Dashboard'>
    <div className={clsx({ [classes.root]: true, [classes.minusMargin]: isMobile })}>
      
    </div>
  </DocumentTitle>
  );
}
