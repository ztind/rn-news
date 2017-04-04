/**
 * Created by Administrator on 2017/4/1.
 * 用户引导页实现
 * 1.实现viewpager滑动引导：管理员身份打开cmd,进入到项目根目录下
 *  npm install react-native-viewpager --save
 *  安装成功后会在node_modules文件夹里生成一个react-native-viewpager库
 * 2。Rn的数据存储:AsyncStorage key-value的存储方式，此处用于存储用户首次打开应用的状态标记，下次打开应用时即可无需再进入引导页
 *
 * 注：vp的数据声明方式和listview一样
 *  3，当Navigato里的configureScene属性返回Navigator.SceneConfigs.HorizontalSwipeJumpFromRight时和vp冲突vp滑动不了
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableHighlight,
    Platform,
    ToastAndroid,
    AlertIOS,
    AsyncStorage
    } from 'react-native';

import ViewPager from 'react-native-viewpager';
import MainComponent from './MainComponent';
class VpComponent extends Component{
    constructor(props) {
        super(props)
        let ds=new ViewPager.DataSource({pageHasChange:(p1,p2)=>p1!==p2});
        let static_urls=['../images/bz.jpg', '../images/bz.jpg', '../images/bz.jpg', '../images/bz.jpg'];
        let net_urls=[
            'http://p0.so.qhmsg.com/bdr/_240_/t01c8038a9358d44da5.jpg',
            'http://p2.so.qhimgs1.com/bdr/_240_/t019fba44d23121dc8e.jpg',
            'http://p1.so.qhmsg.com/bdr/_240_/t0118c7aa7218ce6106.jpg',
            'http://p2.so.qhimgs1.com/bdr/_240_/t01d8541a0e8983455e.jpg'
        ];
        this.state = {
            isShow:false,
            dataSource:ds.cloneWithPages(net_urls)
        }
    }

    /**
     *  autoPlay={false} 是否开启自动播放
     *  isLoop={false}   自动滑动开启后是否无需循环播放
        locked={false}   false关闭手势滑动 true打开、可滑动
        renderPageIndicator={()=><View/>}  vp的指示器，默认为小点
        onChangePage={} 滑动的回调方法
     */
    render(){


        return (
                    <ViewPager
                        dataSource={this.state.dataSource}
                        renderPage={this.getPage.bind(this)}
                        onChangePage={this._onChangePage.bind(this)}
                        renderPageIndicator={()=><View/>}
                        isLoop={false}
                        autoPlay={false}
                        locked={false}
                        />
        );
    }
    //自定义每个item的控件布局
    getPage(url){
        /* 注：Image
         let url="../images/aa.png";
         source={require(url)}  加载失败

         source={require("../images/aa.png")} 加载成功
         */
        let but=<TouchableHighlight
            onPress={this.enterMainUI.bind(this)}
            underlayColor='#ff4777'
            style={styles.highlight}
            >
            <Text style={styles.font}>进入主界面</Text>
        </TouchableHighlight>;

        let enterButton=this.state.isShow?but:null

        return (
            <Image style={styles.backimagestyle} source={{uri:url}}>
                {enterButton}
            </Image>
        );
    }
    enterMainUI(){
        //AsyncStorage存储首次进入状态标记,存储布尔类型失败不支持,存储string类型
        AsyncStorage.setItem('haveEnter','user have enter',(error)=>{
            if(error){
                //alert('存储失败:'+error);
            }else{
                //alert('存储成功');
                //获取属性里的导航器
                let {navigator} = this.props;//对象解构赋值获取到导航器
                navigator.replace(
                    {
                        name:"mainui",
                        component:MainComponent
                    }
                );
            }
        });

    }
    //页面滑动回调
    _onChangePage(page) {

        //this.showTost(page+1+"");//组调用方法必须的用this来调用否则说找不到此方法

        if(page==3) {
            //通过设置state来刷新‘进入主界面’ 按钮的显示和隐藏
            this.setState(
                {
                    isShow:true
                }
            );
        }else{
            this.setState(
                {
                    isShow:false
                }
            );
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
const styles = StyleSheet.create({
    backimagestyle: {
        flex: 1,
        alignItems:'center',
        justifyContent:'flex-end',
        resizeMode: 'cover'
    },
    highlight:{
        borderRadius:5,
        width:150,
        height:35,
        backgroundColor:'#f47983',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:100
    },
    font:{
        color:'white',
        fontSize:14,
    }
});

export default VpComponent;