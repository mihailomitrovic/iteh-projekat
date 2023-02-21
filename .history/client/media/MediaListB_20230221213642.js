import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import GridListTile from '@material-ui/core/GridListTile'
import {Link} from 'react-router-dom'
import ReactPlayer from 'react-player'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '8px 16px',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 70
  },
  gridList: {
    width: '100%',
    minHeight: 180,
    padding: '0px 0 10px'
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
  },
  tile: {
    textAlign: 'center',
    maxHeight: '100%',
    maxWidth: '30%',
    margin: 3,
    padding: 0,
  },
  tileBar: {
    backgroundColor: '#452262',
    textAlign: 'left',
    height: '60px',
    width: '71%',
    marginLeft: 66
  },
  tileTitle: {
    fontSize:'1.1em',
    marginBottom:'5px',
    color:'#ffffff',
    display:"block"
  },
  tileGenre: {
    float: 'left',
    color:'#ffffff',
    marginRight: '5px'
  },
  vid: {
    borderRadius: 5
  }
}))

export default function MediaList(props) { 
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
        {props.media.map((tile, i) => (
          <GridListTile key={i} className={classes.tile}>
            <Link to={"/media/"+tile._id} className = {classes.vid}>
              <ReactPlayer url={'/api/media/video/'+tile._id} width='100%' style={{maxHeight: '100%'}}/>
            </Link>
            <GridListTileBar className={classes.tileBar}
              title={<Link to={"/media/"+tile._id} className={classes.tileTitle}> {tile.title} </Link>}
              subtitle={<span>
                          <span> | {tile.views} views</span>
                          <span className={classes.tileGenre}>
                            <em>{tile.genre} </em>
                          </span>
                        </span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>)
}

MediaList.propTypes = {
  media: PropTypes.array.isRequired
}

