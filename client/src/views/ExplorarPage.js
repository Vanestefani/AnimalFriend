import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';

import compose from 'recompose/compose';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Loading from '../components/Loading';

const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`
  },
  layout: {
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3
    }
  }
});

export class ExplorarPage extends Component {
  state = {
    loading: true,
    following: []
  };

  componentDidMount = () => {
    const { history, retrieveAllUsers } = this.props;
    if (!localStorage.jwtToken) {
      history.push('/login');
    }

    retrieveAllUsers().then(() => {
      this.updateFollowing();
      this.setState({
        loading: false
      });
    });
  };

  componentDidUpdate(prevProps) {
    const { userReducer } = this.props;
    if (!equal(userReducer.following, prevProps.userReducer.following)) {
      this.updateFollowing();
    }
  }

  // Set "following" to be the list of users you are following
  updateFollowing = () => {
    const { authReducer, getCurrUser } = this.props;
    getCurrUser(authReducer.user.userId).then((res) => {
      this.setState({
        following: res.payload.user.following
      });
    });
  };

  render() {
    const {
      authReducer,
      classes,
      followThisUser,
      getCurrUser,
      userReducer,
      unfollowThisUser
    } = this.props;
    const { following, loading } = this.state;

    return loading ? (
      <div>

        <Loading />
      </div>
    ) : (
      <div>

        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container justify="center" spacing={40}>
              {userReducer.allUsers.map(
                user =>
                  (user._id === authReducer.user.userId ? null : (
                    <Grid item key={user._id} sm={6} md={3} lg={2}>

                    </Grid>
                  ))
              )}
            </Grid>
          </div>
        </main>
      </div>
    );
  }
}

export default ExplorarPage;