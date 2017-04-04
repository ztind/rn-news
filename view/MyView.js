/**
 * Created by Administrator on 2017/4/2.
 * 拍照、相册 react-native-image-picker
 * https://github.com/marcshilling/react-native-image-picker
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    PixelRatio,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Platform,
    ToastAndroid,
    AlertIOS,
    Alert
    }
    from 'react-native';
import  ImagePicker  from 'react-native-image-picker';
import QrCodeView from './QrCodeView';
//获取手机屏幕宽高
let Dimensions=require('Dimensions');
let ScreenWidth=Dimensions.get('window').width;
let ScreenHeight=Dimensions.get('window').height;


class MyView extends Component{
    constructor(props){
        super(props)
        this.state={
            avatarSource:null
        }
    }
    render(){
        let imageSource=this.state.avatarSource==null?require('../images/yws.jpg'):this.state.avatarSource;
        return (
            <View style={styles.main}>
                    <Image style={styles.backImage} source={require('../images/our_bj.jpg')} resizeMode='cover'>
                        <TouchableWithoutFeedback
                            onPress={this.paizaoXainchePress.bind(this)}
                            underlayColor="transparent"
                            >
                            <Image style={styles.photo} source={imageSource}/>
                        </TouchableWithoutFeedback>
                    </Image>
                    <View style={styles.viewTwo}>
                        <TouchableHighlight
                             style={styles.touchItem}
                             onPress={this.collectionPress.bind(this)}
                             underlayColor='#d2d2d2'
                             >
                            <View>
                                <Image style={styles.itemImage} source={require('../images/sc_i.png')}/>
                                <Text style={styles.font}>收藏</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.touchItem,styles.followView]}
                            onPress={this.followPress.bind(this)}
                            underlayColor='#d2d2d2'
                            >
                            <View>
                                <Image style={styles.itemImage} source={require('../images/gz_i.png')}/>
                                <Text style={styles.font}>关注</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.touchItem,styles.messageView]}
                            onPress={this.messagePress.bind(this)}
                            underlayColor='#d2d2d2'
                            >
                            <View>
                                <Image style={styles.itemImage} source={require('../images/xx_i.png')}/>
                                <Text style={styles.font}>消息</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                <TouchableHighlight
                    style={styles.touchText}
                    onPress={this.itemTextPress.bind(this,1)}
                    underlayColor='#d2d2d2'
                    >
                    <Text style={styles.itemText}>登陆/注册</Text>
                </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.touchText}
                        onPress={this.itemTextPress.bind(this,2)}
                        underlayColor='#d2d2d2'
                        >
                        <Text style={styles.itemText}>资料修改</Text>
                    </TouchableHighlight>
                <TouchableHighlight
                    style={styles.touchText}
                    onPress={this.itemTextPress.bind(this,3)}
                    underlayColor='#d2d2d2'
                    >
                    <Text style={styles.itemText}>关于我们</Text>
                </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.touchText}
                        onPress={this.itemTextPress.bind(this,4)}
                        underlayColor='#d2d2d2'
                        >
                        <Text style={styles.itemText}>设   置</Text>
                    </TouchableHighlight>
            </View>
        );
    }
    //拍照和从相册选择图片
    paizaoXainchePress(){
        var photoOptions = {
            //底部弹出框选项
            title:'请选择',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'选择相册',
            quality:0.75,
            allowsEditing:true,
            noData:false,
            storageOptions: {
                skipBackup: true,
                path:'images'
            }
        }
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source
                });
            }
        })
    }


    collectionPress(){
        this.showTost("收藏");
    }
    followPress(){
        this.showTost("关注");
    }
    messagePress(){
        this.showTost("消息");
    }
    itemTextPress(index){
        switch(index){
            case 1:
                this.showTost("1");
                break;
            case 2:
                this.showTost("2");
                break;
            case 33:
                let navigator=this.props.navigator;
                navigator.push(
                    {
                        name:'qrcode',
                        component:QrCodeView
                    }
                );
                break;
            case 4:
                this.showTost("4");
                break;
            case 5:
                this.showTost("5");
                break;
        }
    }
    showTost(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg,ToastAndroid.SHORT);
        } else {
            AlertIOS.alert(msg);
        }
    }
}
const styles=StyleSheet.create(
    {
        main:{
            flex:1
        },
        backImage:{
            width:ScreenWidth,
            height:150,
            justifyContent:'center',
            alignItems:'center'
        },
        viewTwo:{
            height:60,
            flexDirection:'row'
        },
        photo:{
            width:45,
            height:45
        },
        touchItem:{
            flex:1,
            backgroundColor:'#f4f2f2',
            justifyContent:'center',
            alignItems:'center',
        },
        itemImage:{
            width:30,
            height:30
        },
        followView:{
            borderLeftWidth:1/PixelRatio.get(),
            borderLeftColor:'red'
        },
        messageView:{
            borderLeftWidth:1/PixelRatio.get(),
            borderLeftColor:'red'
        },
        font:{
            color:'#ec77cd'
        },
        itemText:{
            fontSize:15,
            color:'#515151',
            margin:10
        },
        touchText:{
            borderBottomWidth:1/PixelRatio.get(),
            borderBottomColor:'red'
        }
    }
);
export default MyView;