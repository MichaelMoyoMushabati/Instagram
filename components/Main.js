import React, { Component } from 'react'
import { Text, View} from 'react-native';

//connecting to redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../redux/actions/index';

export class Main extends Component {

    componentDidMount() {
        this.props.fetchUser();

    }

    render() {

        const {currentUser} = this.props;

        console.log(currentUser);

        return (
            <View style={{ flex: 1, justifyContent: 'center'}}>
                <Text>User is Logged In</Text>
            </View>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser

})


//Accessing the fetchUser function from the actions folder
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapDispatchProps)(Main);