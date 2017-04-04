/**
 * Created by Administrator on 2017/4/1.
 * 闪屏页
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    Image,
    AsyncStorage
    }
    from 'react-native';

import VpComponent from './VpComponent';
import MainComponent from './MainComponent';

class SplashComponent extends Component{
    //构造方法里拿到导航器对象，进行页面切换
    constructor(props){
        super(props)
        let {navigator}=props;//对象解构赋值
        AsyncStorage.getItem("haveEnter", (error,result) => {

            if(result==null){
                //2s后进行页面跳转
                setTimeout(()=>{
                    navigator.replace({name:"VpComponent",component:VpComponent});
                },2000);
            }else{

                setTimeout(()=>{
                    navigator.replace({name:"mainui",component:MainComponent});
                },2000);
            }
        });

    }
    render(){
        return (
            <Image source={require('../images/splash.jpeg')} style={styles.backimagestyle}/>
        );
    }
}
const styles = StyleSheet.create({
    backimagestyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});
export default SplashComponent;
