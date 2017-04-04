/**
 * Created by Administrator on 2017/4/2.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableHighlight
    }
from 'react-native';

import ScrollableTabView  from 'react-native-scrollable-tab-view';
import ListItem from './ListItem';
class NewsView extends Component{
    render(){
        return (
            <ScrollableTabView>
                <Page tabLabel="头条" label="top" navigator={this.props.navigator}/>
                <Page tabLabel="社会" label="shehuei" navigator={this.props.navigator}/>
                <Page tabLabel="体育" label="tiyu" navigator={this.props.navigator}/>
                <Page tabLabel="科技" label="keji" navigator={this.props.navigator}/>
                <Page tabLabel="时尚" label="shishang" navigator={this.props.navigator}/>
                <Page tabLabel="财经" label="caijing" navigator={this.props.navigator}/>
                <Page tabLabel="国内" label="guonei" navigator={this.props.navigator}/>
                <Page tabLabel="娱乐" label="yule" navigator={this.props.navigator}/>
                <Page tabLabel="国际" label="guoji" navigator={this.props.navigator}/>
                <Page tabLabel="军事" label="junshi" navigator={this.props.navigator}/>
            </ScrollableTabView>
        );
    }
}
class Page extends Component{
    /**
     * ScrollableTabView：tab切换构造方法/componentDidMount只创建/执行一次，而render在每次切换时都会回调。无下一页的预加载
     */
    constructor(props){
        super(props);
        let ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            isLoading:true,
            dataSource:ds
        }
    }
    render(){
        let view=this.state.isLoading?<Text style={styles.loadFont}>数据加载中...</Text>:
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowJsonData)=><ListItem rowJsonData={rowJsonData} navigator={this.props.navigator}/>}
                />;
        return (
            <View style={{flex:1}}>
                {view}
            </View>
        );
    }

    componentDidMount(){
        this.requestNet();
    }
    requestNet(){
        let type=this.props.label;
        let url="http://v.juhe.cn/toutiao/index?type="+type+"&key=aa86168aa79302580d8a91e57a0f9400";
        fetch(url)
            .then((resultJsonString)=>resultJsonString.json())
            .then((resultJson)=>{
                let array=resultJson.result.data;
                if(array!=null){
                    this.setState(
                        {
                            isLoading:false,
                            dataSource:this.state.dataSource.cloneWithRows(array)
                        }
                    );
                }
            })
            .done();
    }


}
const styles=StyleSheet.create(
    {
        main:{
            flex:1
        },
        loadFont:{
            margin:5,
            color:'black',
            alignSelf:'center'
        }
    }
);
export default NewsView;