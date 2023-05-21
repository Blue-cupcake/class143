import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Header,AirbnbRating,Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from "axios";

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state = {
            movieDetails:{}
        }
    }

    componentDidMount(){
        this.getMovie()
    }

    timeConvert(num){
        var hours = Math.floor(num/60);
        var minute = num%60
        return`${hours} hrs ${minute} mins`
    }

    getMovie = () => {
        const {url} = " ";
        axios
        .get(url)
        .then(response=>{
         let details = response.data.data
         details["duration"] = this.timeConvert(details.duration);
         this.setState({movieDetails:details})
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    likedMovie = () => {
        const {url} = " ";
        axios
        .post(url)
        .then(response=>{
         this.getMovie()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    unlikedMovie = () => {
        const {url} = " ";
        axios
        .post(url)
        .then(response=>{
         this.getMovie()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    notWatchedMovie = () => {
        const {url} = " ";
        axios
        .post(url)
        .then(response=>{
         this.getMovie()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    
    render(){
        const {movieDetails} = this.state;
        if (movieDetails.poster_link){
            const {
                poster_link,
                title,
                release_date,
                duration,
                overView,
                rating
            } = movieDetails;

            return(
                <View style = {style.container}>
                    <View style = {style.headerContainer}>
                        <Header 
                        centerComponent = {{
                            text:"Movie Recommendor",
                            style:style.headerTitle
                        }}
                        >
                        rightComponent = {{icon:"search",color:"#FFF"}}
                        backgroundColor = {"#D500F9"}
                        containerStyle = {{flex:1}}    
                        </Header>
                    </View>
                    <View style = {style.subContainer}>
                    <View style = {style.subTopContainer}>
                        <Image style = {style.posterImage}
                        source = {{uri:poster_link}}></Image>
                    </View>  
                    <View style = {style.subBottomContainer}>
                    <View style = {style.upperBottomContainer}>
                        <Text style = {style.title}>{title}</Text>
                        <Text style = {style.subTitle}>{`${
                            release_date.split("-")[0]
                        } | ${duration}`}</Text>
                    </View>   
                    <View style = {style.middleBottomContainer}>
                    <View style = {{flex:0.3}}>
                    <AirbnbRating
                    count={10}
                    reviews = {["","","","",""]}
                    defaultRating = {rating}
                    isDisabled = {true}
                    size = {RFValue(25)}
                    starConatinerStyle = {{marginTop:-30}}
                    ></AirbnbRating>
                    </View>

                    <View style = {{flex:0.7, padding:15}}>
                        <Text style = {style.overview}>{overview}</Text>
                    </View>
                    </View>

                    <View style = {style.lowerBottomContainer}>
                    <View style = {style.iconBottomContainer}>
                        <TouchableOpacity
                        onPress={this.likedMovie}>
                            <Icon 
                            reverse
                            name = {"check"}
                            type = {"entypo"}
                            size = {RFValue(30)}
                            color = {"#76ff03"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={this.unlikedMovie}>
                            <Icon 
                            reverse
                            name = {"cross"}
                            type = {"entypo"}
                            size = {RFValue(30)}
                            color = {"#ff1744"}
                            />
                        </TouchableOpacity>

                        </View>
                        <View style = {styles.buttonContainer}>
                        <TouchableOpacity
                        style = {styles.button}
                        onPress = {this.notWatchedMovie}>
                            <Text style = {styles.buttonText}>Did not watch</Text>
                        </TouchableOpacity>
                       
                        </View>
                        </View>

                    </View>
                    </View>
                </View>
            )
        }
        return null
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    headerContainer:{
        flex:0.1
    },
    headerTitle:{
        color:"#fff",
        fontWeight:"bold",
        fontSize:RFValue(18),
    },
    subContainer:{
        flex:0.9
    },
    subTopContainer:{
        flex:0.4,
        justifyContent:"center",
        alignItems:"center"
    },
    posterImage:{
        width:"60%",
        height:"90%",
        resizeMode:"stretch",
        borderRadius:RFValue(30),
        marginHorizontal:RFValue(10)
    },
    subBottomContainer:{
        flex:0.6
    },
    upperBottomContainer:{
        flex:0.2,
        alignItems:"center"
    },
    title:{
        fontSize:RFValue(29),
        fontWeight:"bold",
        textAlign:"center"
    },
    subTitle:{
        fontSize:RFValue(14),
        fontWeight:"300",
        textAlign:"center"
    },
    middleBottomContainer:{
        flex:0.35
    },
    overView:{
        fontSize:RFValue(13),
        textAlign:"center",
        fontWeight:"300",
        color:"gray"
    },
    lowerBottomContainer:{
        flex:0.35
    },
    IconButtonContainer:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        width:RFValue(160),
        height:RFValue(50),
        borderRadius:RFValue(20),
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        marginTop:RFValue(50)
    },
    buttonText:{
        fontSize:RFValue(50),
        fontWeight:"bold"
    },
}) 

