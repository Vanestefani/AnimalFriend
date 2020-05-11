import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';

import compose from 'recompose/compose';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Loading from '../components/Loading';
import UserCard from './UserCard';
import HomeNarbar   from './Navbars/homeNarbar';
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

export class Following extends Component {
  state = {
    loading: true,
    followingIds: [],
    followingUsers: []
  };

  componentDidMount = () => {
    const { authReducer, getFollowingUsers, history } = this.props;
    if (!localStorage.jwtToken) {
      history.push('/login');
    }
    getFollowingUsers(authReducer.user.userId).then(() => {
      this.updateFollowing();
    });
  };

  componentDidUpdate(prevProps) {
    const { userReducer } = this.props;
    if (!equal(userReducer.following, prevProps.userReducer.following)) {
      this.updateFollowing();
    }
  }

  updateFollowing = () => {
    const { getCurrUser, userReducer } = this.props;

    let idsOfUsersYouAreFollowing = [];
    let usersYouAreFollowing = [];
    const requests = userReducer.following.map(userId =>
      getCurrUser(userId).then((res) => {
        idsOfUsersYouAreFollowing = [
          ...idsOfUsersYouAreFollowing,
          res.payload.user._id
        ];
        usersYouAreFollowing = [...usersYouAreFollowing, res.payload.user];
      }));

    Promise.all(requests).then(() => {
      this.setState({
        loading: false,
        followingIds: idsOfUsersYouAreFollowing,
        followingUsers: usersYouAreFollowing
      });
    });
  };

  render() {
    const {
      authReducer,
      classes,
      followThisUser,
      getCurrUser,
      unfollowThisUser
    } = this.props;
    const { followingIds, followingUsers, loading } = this.state;

    return loading ? (
      <div>
        <HomeNarbar/>
        <Loading />
      </div>
    ) : (
      <div>
        <HomeNarbar/>
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container justify="center" spacing={40}>
              {followingUsers.map(
                user =>
                  (user._id === authReducer.user.userId ? null : (
                    <Grid item key={user._id} sm={6} md={3} lg={2}>
                      <UserCard
                        isFollowing={followingIds.includes(user._id)}
                        followUser={followThisUser}
                        getUser={getCurrUser}
                        listedUser={user}
                        signedInUser={authReducer.user}
                        unfollowUser={unfollowThisUser}
                      />
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

export default Following;