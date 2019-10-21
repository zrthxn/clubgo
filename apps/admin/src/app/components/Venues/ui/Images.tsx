// import React, { Component } from 'react'
// import { Form, Button } from 'reactstrap'
// import { Grid } from '@material-ui/core'

// import MediaCard from '../../Images/MediaCard'

// export interface ImagesProps {
//   syncParentData?: Function
//   populate?: boolean,
//   data?: any
// }
// export class Images extends Component<ImagesProps> {
//   state = {
//     loading: true,
//     populateDataFromParent: false,
//     data: {
//       cover: [],
//       ambiance: [],
//       food: [],
//       bar: []
//     }
//   }

//   componentDidMount() {
//     this.setState(()=>{
//       if(this.props.populate) {
//         let { images } = this.props.data
//         let data = {}

//         for (const img of images)
//           data[img.tags[0]] = []
        
//         for (const img of images)
//           data[img.tags[0]].push(img)

//         return {
//           data,
//           populateDataFromParent: true,
//           loading: false
//         }
//       }
//       else
//         return {
//           loading: false
//         }
//     })
//   }
  

//   syncDataChanges = (childData, key:string) => {
//     let { data } = this.state
//     let iterable = data
//     iterable[key] = childData.images
//     data = { ...iterable }

//     this.setState((prevState, props)=>{
//       let imageBundle = []
//       for (let category in this.state.data) {
//         if (this.state.data.hasOwnProperty(category)) {
//           let files = this.state.data[category]
//           for (let image of files) {
//             imageBundle.push(image)
//           }
//         }
//       }

//       this.props.syncParentData({
//         images: imageBundle,
//         videoURL: undefined
//       }, 'media')

//       return {
//         data
//       }
//     })
//   }

//   render() {
//     if(!this.state.loading) return (
//       <Grid item container xs={12} spacing={3}>
//         <Grid item md={6} xs={12}>
//           <MediaCard tag="cover" name="cover" 
//             syncParentData={this.syncDataChanges}
//             populate={this.state.populateDataFromParent}
//             data={{ images: this.state.data.cover }}
//           />
//           <MediaCard tag="ambiance" name="ambiance" 
//             syncParentData={this.syncDataChanges}
//             populate={this.state.populateDataFromParent}
//             data={{ images: this.state.data.ambiance }}
//           />
//         </Grid>

//         <Grid item md={6} xs={12}>
//           <MediaCard tag="food" name="food" 
//             syncParentData={this.syncDataChanges}
//             populate={this.state.populateDataFromParent}
//             data={{ images: this.state.data.food }}
//           />
//           <MediaCard tag="bar" name="bar" 
//             syncParentData={this.syncDataChanges}
//             populate={this.state.populateDataFromParent}
//             data={{ images: this.state.data.bar }}
//           />
//         </Grid>
//       </Grid>
//     )
//     else return (
//       <h3>Loading...</h3>
//     )
//   }
// }

// export default Images
