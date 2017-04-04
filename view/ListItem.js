/**
 * Created by Administrator on 2017/4/2.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    PixelRatio,
    TouchableHighlight
    } from 'react-native';
import ArticleDetialView from './ArticleDetialView';


class ListItem extends Component{
    render(){
        let rowJsonData=this.props.rowJsonData;
        let itemView=this.getRowView(rowJsonData);
        return  itemView;
    }
    getRowView(rowJsonData){

        let image_url1=rowJsonData.thumbnail_pic_s;
        let image_url2=rowJsonData.thumbnail_pic_s02;
        let image_url3=rowJsonData.thumbnail_pic_s03;
        let imageArray=[];
        if(image_url1!=null){
            imageArray.push(image_url1);
        }
        if(image_url2!=null){
            imageArray.push(image_url2);
        }
        if(image_url3!=null){
            imageArray.push(image_url3);
        }

        let itemView;
        if(imageArray.length==1){
            itemView=this.getOneItemView(rowJsonData,imageArray);
        }else if(imageArray.length==2){
            itemView=this.getTwoItemView(rowJsonData,imageArray);
        }else if(imageArray.length==3){
            itemView=this.getThreeItemView(rowJsonData,imageArray);
        }
        return itemView;
    }
    getOneItemView(rowJsonData,imageArray){
        return (
            <TouchableHighlight
                style={styles.highlight}
                onPress={this.onItemPress.bind(this,rowJsonData.url)}
                underlayColor="rgb(232,232,232)"
                >
                <View>
                    <Text numberOfLines={2} style={styles.titleFont}>{rowJsonData.title}</Text>
                    <Image style={styles.imageOne} source={{uri:imageArray[0]}}/>
                    <View style={styles.authorAndTimeView}>
                        <Text style={styles.font}>{rowJsonData.author_name}</Text>
                        <Text style={styles.font}>{rowJsonData.date}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    getTwoItemView(rowJsonData,imageArray){
        return (
        <TouchableHighlight
            style={styles.highlight}
            onPress={this.onItemPress.bind(this,rowJsonData.url)}
            underlayColor="rgb(232,232,232)"
            >
            <View>
                <Text numberOfLines={2} style={styles.titleFont}>{rowJsonData.title}</Text>
                <View style={styles.itemTwo}>
                    <Image source={{uri:imageArray[0]}}/>
                    <Image style={[styles.image,{marginLeft:5}]} source={{uri:imageArray[1]}}/>
                </View>
                <View style={styles.authorAndTimeView}>
                    <Text style={styles.font}>{rowJsonData.author_name}</Text>
                    <Text style={styles.font}>{rowJsonData.date}</Text>
                </View>
            </View>
        </TouchableHighlight>
        );
    }
    getThreeItemView(rowJsonData,imageArray){
        return (
        <TouchableHighlight
            style={styles.highlight}
            onPress={this.onItemPress.bind(this,rowJsonData.url)}
            underlayColor="rgb(232,232,232)"
            >
            <View>
                    <Text numberOfLines={2} style={styles.titleFont}>{rowJsonData.title}</Text>
                    <View style={styles.itemThree}>
                        <Image style={styles.image} source={{uri:imageArray[0]}}/>
                        <Image style={[styles.image,{marginLeft:5}]} source={{uri:imageArray[1]}}/>
                        <Image style={[styles.image,{marginLeft:5}]} source={{uri:imageArray[2]}}/>
                    </View>
                    <View style={styles.authorAndTimeView}>
                        <Text style={styles.font}>{rowJsonData.author_name}</Text>
                        <Text style={styles.font}>{rowJsonData.date}</Text>
                    </View>
            </View>
        </TouchableHighlight>
        );
    }
    onItemPress(web_url){
        //获取导航器对象进行页面切换(跳转到web展示页)
        let {navigator}=this.props;
        navigator.push(
            {
                name:'ArticleDetialView',
                component:ArticleDetialView,
                params:{
                    url:web_url
                }
            }
        );
    }

}
const styles=StyleSheet.create(
    {
        highlight:{
            padding:5,
            borderBottomWidth:1/PixelRatio.get(),
            borderBottomColor:'red',
            backgroundColor:'rgb(249,249,249)'
        },
        itemTwo:{
            flexDirection:'row'
        },
        itemThree:{
            flexDirection:'row'
        },
        imageOne:{
            flex:1,
            height:200
        },
        image:{
            flex:1,
            height:80,
        },
        titleFont:{
            color:'black',
            fontSize:15
        },
        font:{
            color:'#4a4266'
        },
        authorAndTimeView:{
            flexDirection:'row',
            justifyContent:'space-between'
        }
    }
);
export default ListItem;