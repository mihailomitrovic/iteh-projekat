import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ReactPlayer from 'react-player'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 15
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: '#452262',
    fontWeight: 800,
    marginTop: 0,
    marginLeft: 0
  },
  card: {
    width: '100%',
    display: 'inline-flex',
    marginBottom: 10
  },
  details: {
    display: 'inline-block',
    width: "100%"
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  controls: {
    marginTop: '8px'
  },
  date: {
    color: 'rgba(0, 0, 0, 0.4)'
  },
  mediaTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '130px',
    fontSize: '1em',
    marginBottom: '5px',
    color: '#ffffff'
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.67)'
  },
  views: {
    display: 'inline',
    lineHeight: '3',
    paddingLeft: '8px',
    color: theme.palette.text.primary
  }
}))
export default function RelatedMedia(props) {
  const classes = useStyles()
    return (
      <Paper className={classes.root} elevation={4} style={{padding: '16px', border: '3px solid #452262'}}>
          <Typography variant="h6" className={classes.title}>
            Up Next
          </Typography>
          {props.media.map((item, i) => {
              return <span key={i}><Card className={classes.card} style = {{border: '3px solid #452262'}}>
                <div style={{marginRight: "5px", backgroundColor: "#452262"}}>
              <Link to={"/media/"+item._id}><ReactPlayer url={'/api/media/video/'+item._id} width='160px' height='140px'/></Link>
              </div>
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Link to={'/media/'+item._id}><Typography type="title" component="h3" className={classes.mediaTitle} style={{color:"#452262", fontWeight: 'bold'}} >{item.title}</Typography></Link>
                          <Typography type="subheading" className={classes.subheading}>
                            {item.genre}
                          </Typography>

                          <Typography component="p" className={classes.date}>
                            {(new Date(item.created)).toDateString()}
                          </Typography>

                        </CardContent>
                        <div className={classes.controls}>
                        <Typography type="subheading" component="h3" className={classes.views} color="secondary"> {item.views} views</Typography>
                        </div>
                      </div>

                    </Card>
                    <Divider/>
                    </span>
            })
          }
      </Paper>
    )
  }

RelatedMedia.propTypes = {
  media: PropTypes.array.isRequired
}