/**
 * Created by Administrator on 2017/4/1.
 * 主界面
 * 底部Tab: https://github.com/expo/react-native-tab-navigator
 * 顶部课滑动tab: https://github.com/skv-headless/react-native-scrollable-tab-view
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
    }
    from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import NewsView from './NewsView';
import MoviesView from './MoviesView';
import MyView from './MyView';


class MainComponent extends Component{
    constructor(props){
        super(props)
        //设置默认选中的item
        this.state={
            selectedTab:"news"
        }
    }

    render(){
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'news'}
                    title="新闻"
                    renderIcon={() => <Image style={styles.image} source={require('../images/news_icon.png')} />}
                    renderSelectedIcon={() => <Image style={styles.image} source={require('../images/news_s.png')} />}
                    onPress={this.pressNews.bind(this,"新闻")}

                    titleStyle={{color:'black'}}
                    selectedTitleStyle={{color:"red"}}
                    >
                    <NewsView navigator={this.props.navigator}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'movies'}
                    title="影讯"
                    renderIcon={() => <Image style={styles.image} source={require('../images/movies.png')} />}
                    renderSelectedIcon={() => <Image style={styles.image} source={require('../images/movies_s.png')} />}
                    onPress={this.pressMovies.bind(this,"影讯")}

                    titleStyle={{color:'black'}}
                    selectedTitleStyle={{color:"red"}}
                    >
                    <MoviesView navigator={this.props.navigator}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'my'}
                    title="我的"
                    renderIcon={() => <Image style={styles.image} source={require('../images/my.png')} />}
                    renderSelectedIcon={() => <Image style={styles.image} source={require('../images/my_s.png')} />}
                    onPress={this.presMy.bind(this,"我的") }

                    titleStyle={{color:'black'}}
                    selectedTitleStyle={{color:"red"}}
                    >
                    <MyView navigator={this.props.navigator}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
    pressNews(msg) {
        //防止点击多次render界面刷新
        let currentTab = this.state.selectedTab;
        if (currentTab !== 'news') {
            this.setState({selectedTab: 'news'})
        }
    }
    pressMovies(mmsg){
        //防止点击多次render界面刷新
        let currentTab = this.state.selectedTab;
        if (currentTab !== 'movies') {
            this.setState({selectedTab: 'movies'})
        }
    }
    presMy(msg){
        //防止点击多次render界面刷新
        let currentTab=this.state.selectedTab;
        if(currentTab!=='my'){
            this.setState({ selectedTab: 'my' })
        }
    }

}
const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:'#c1c1d1'
        },
        image:{
            width:25,
            height:25
        }
    }
);
export default MainComponent;