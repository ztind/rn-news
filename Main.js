/**
 * Created by Administrator on 2017/4/1.
 */
import React,{Component} from 'react';
import {
    Navigator
    }
from 'react-native';
import SplashComponent from './view/SplashComponent';

class Main extends Component{
    render(){
        let defaultName="splashcomponent";
        let defaultComponent=SplashComponent;

        return (
            <Navigator
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
}
export default Main;