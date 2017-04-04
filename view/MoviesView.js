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
    TouchableHighlight,
    }
    from 'react-native';
import ViewPager from 'react-native-viewpager';
import ArticleDetialView from './ArticleDetialView';
class MoviesView extends Component{
    constructor(props){
        super(props)
        let list_ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        let vp_ds=new ViewPager.DataSource({pageHasChange:(p1,p2)=>p1!==p2});

        this.state={
            isLoading:true,
            list_datasource:list_ds,
            vp_datasource:vp_ds
        }
    }
    render(){
        let view=this.state.isLoading?<Text style={styles.loadFont}>数据加载中...</Text>:
            <View style={styles.main}>
                <ViewPager
                    dataSource={this.state.vp_datasource}
                    renderPage={this.getVpPage.bind(this)}
                    onChangePage={this._onChangePage.bind(this)}
                    isLoop={true}
                    autoPlay={true}
                    locked={false}
                    />
                <ListView
                    dataSource={this.state.list_datasource}
                    renderRow={this.getListitem.bind(this)}
                    />
            </View>;
        return view;
    }
    _onChangePage(){}
    getVpPage(jsonObj){
        return (
            <TouchableHighlight
                onPress={this.listItemPress.bind(this,jsonObj)}
                underlayColor="transparent"
                style={styles.main}
                >
                <Image style={styles.vpImage} source={{uri:jsonObj.iconaddress}}/>
            </TouchableHighlight>
        );
    }

    getListitem(jsonObj){
        return (
            <TouchableHighlight
                onPress={this.listItemPress.bind(this,jsonObj)}
                underlayColor="#eaeaea"
                >
                <View style={styles.touchLvItem}>
                    <Image style={styles.listItemImage} source={{uri:jsonObj.iconaddress}}/>
                    <View style={styles.lv_item_text}>
                        <Text>{jsonObj.tvTitle}</Text>
                        <Text>上映时间：{jsonObj.playDate.data}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    componentDidMount(){
        let url="http://op.juhe.cn/onebox/movie/pmovie?key=378bfad803d2d11d048d682873acbb7f&city=北京";
        fetch(url)
            .then((res)=>res.json())
            .then((result)=>{
                let resultDataData=result.result.data;
                let vpData=resultDataData[0];
                let vp_json=vpData.data;

                let listData=resultDataData[1];
                let list_json=listData.data;
                this.setState(
                    {
                        isLoading:false,
                        vp_datasource:this.state.vp_datasource.cloneWithPages(vp_json),
                        list_datasource:this.state.list_datasource.cloneWithRows(list_json)
                    }
                );
            })
            .done();
    }
    listItemPress(jsonObj){
        //获取导航器对象进行页面切换(跳转到web展示页)
        let navigator=this.props.navigator;
        navigator.push(
            {
                name:'ArticleDetialView',
                component:ArticleDetialView,
                params:{
                    url:jsonObj.iconlinkUrl
                }
            }
        );
    }
}
const styles=StyleSheet.create(
    {
        main:{
            flex:1
        },
        vpImage: {
            flex:1
        },
        loadFont:{
            margin:5,
            color:'black',
            alignSelf:'center'
        },
        listItemImage:{
            width:60,
            height:60
        },
        touchLvItem:{
            flexDirection:'row',
            marginLeft:5,
            marginTop:5,
            marginRight:5
        },
        lv_item_text:{
            justifyContent:'center',
            marginLeft:5,
            color:'gray'
        }
    }
);
export default MoviesView;