import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import MediaList from '../media/MediaList'
import {listPopular} from '../media/api-media.js'
import { Button, Input, TextareaAutosize } from '@material-ui/core'
import { Label } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  card: {
    margin: `${theme.spacing(5)}px 30px`,
    borderRadius: 15
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px 0px`,
    color: '#452262'
  },
  media: {
    minHeight: 330
  },
  input: {
    marginLeft: 30,
    marginTop: 40,
    borderColor: 'black',
    width: 300,
  }
}))

export default function Home(){
  const classes = useStyles()
  const [media, setMedia] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listPopular(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setMedia(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])
  return (
      <div>
      <Input className={classes.input} placeholder = {'Enter the name of the video'}></Input>
       <Card className={classes.card} style = {{border: '3px solid #452262'}}>
        <Typography variant="h6" className={classes.title}>
          Most viewed
        </Typography>
          <MediaList media={media}/>
      </Card>
      </div>
  )
}