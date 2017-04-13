/**
 * Created by Administrator on 2017/4/1.
 */
import React,{Component} from 'react';
import {
    Navigator,
    BackAndroid,
    ToastAndroid
    }
from 'react-native';
import SplashComponent from './view/SplashComponent';

class Main extends Component{
    render(){
        let defaultName="splashcomponent";
        let defaultComponent=SplashComponent;

        return (
            <Navigator
            	ref="refnavigator"
                initialRoute={{name:defaultName,component:defaultComponent}}

                configureScene={
                    (route)=>{
                        //界面跳转动画
                        //Navigator.SceneConfigs.HorizontalSwipeJumpFromRight时和vp冲突vp滑动不了
                        return Navigator.SceneConfigs.FloatFromRight;
                    }
                }

                renderScene={
                    (route,navigator)=>{
                        let Component=route.component;
                        return <Component {...route.params} navigator={navigator}/>
                    }
                }
                />
        );
    }
    //***********************Android Back*************************

    //组件安装完
    componentDidMount(){
        BackAndroid.addEventListener('androidBack', this._customAlertHandleBack.bind(this));
    }
    //组件卸载
    componentWillUnmount(){
        BackAndroid.removeEventListener('androidBack', this._customAlertHandleBack.bind(this));
    }
    _customAlertHandleBack(){
        let navigator=this.refs.refnavigator;//父组件获取子组件对象用ref
        if(navigator!==null){
            let routes=navigator.getCurrentRoutes();//获取路由数组
            if(routes.length>1){
                //直接退出此层
                navigator.pop();
                return true;

            }else{
                //2s内按back退出
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    return false;
                }
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
                return true;
            }
        }
    }
    //1，自定义android back返回按钮事件
    customAlertHandleBack = () =>{
        //return true忽略默认的back退出，下次点击会继续回调该方法，false则使用默认back退出程序

        Alert.alert('提示','确定要退出么?',
            [
                {text:'取消',onPress:() => {}},
                {text:'确定',onPress:() => BackAndroid.exitApp()}
            ]);
        return true;
    }

    //2，2s内点击两次back退出
    customClickTwoHandleBack = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
    };
}
export default Main;