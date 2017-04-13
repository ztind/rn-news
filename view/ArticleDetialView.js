/**
 * Created by Administrator on 2017/4/2.
 * 文章详情页
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    PixelRatio,
    WebView,
    TouchableHighlight
    }
    from 'react-native';

class ArticleDetialView extends Component{

    render(){
        return (
            <View style={styles.mainView}>
                <View style={styles.topView}
                    >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableHighlight
                            onPress={this.backClick.bind(this)}
                            underlayColor="transparent"
                            >
                            <Image style={styles.backImage} source={require('../images/back.png')}/>
                        </TouchableHighlight>
                        <Text style={styles.font} onPress={this.backClick.bind(this)}>返回</Text>
                    </View>
                </View>
                <WebView source={{uri:this.props.url}}/>
            </View>
        );
    }
    backClick(){
        let navigator=this.props.navigator;
        navigator.pop();
    }

}
const styles=StyleSheet.create(
    {
        mainView:{
            flex:1,
        },
        topView:{
            borderBottomWidth:1/PixelRatio.get(),
            borderBottomColor:'red'
        },
        font:{
            color:'red',
            fontSize:15,
            marginLeft:2,
            marginTop:10,
            marginBottom:10
        },
        backImage:{
            width:15,
            height:15,
            marginLeft:5,
            marginTop:10,
            marginBottom:10
        }
    }
);
export default ArticleDetialView;