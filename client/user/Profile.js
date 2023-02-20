import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import {listByUser} from '../media/api-media.js'
import MediaList from '../media/MediaList'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    borderRadius: 15,
    paddingTop: 4
  }),
  avatar: {
    color: '#ffffff',
    backgroundColor: '#734F92',
    height: 40,
    width: 40,
  },
  avatardiv: {
    marginTop: 30
  },
  name: {
    fontWeight: 'bold',
    marginLeft: 1,
    fontSize: 20,
    fontFamily: 'Arial, Helvetica, sans-serif'
  },
  email: {
    marginLeft: 75,
    marginBottom: 20,
    fontSize: 15,
    fontStyle: 'italic',
    color: '#452262',
    fontFamily: 'Arial, Helvetica, sans-serif',
    marginTop: -15
  }
}))

export default function Profile({ match }) {
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()
  const [media, setMedia] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])
  
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listByUser({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setMedia(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <Paper className={classes.root} elevation={4} style = {{border: '3px solid #452262'}}>
        <List>
          <ListItem>
            <ListItemAvatar className = {classes.avatardiv}>
              <Avatar className={classes.avatar}>
                {user.name && user.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText disableTypography primary={user.name} className = {classes.name}/>
            {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
              (<ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="secondary" style = {{marginTop: 30}}>
                    <Edit/>
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id}/>
              </ListItemSecondaryAction>)
            }
          </ListItem>
          <ListItemText disableTypography primary={user.email} className = {classes.email}/>
          <Divider style={{marginBottom: 20}}/>
          <MediaList media={media}/>
        </List>
      </Paper>
    )
  }