import React, {useEffect} from 'react'
import {View,Text, StyleSheet, FlatList} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import {PostList} from '../components/PostList'
import {loadPosts} from '../store/actions/post'

export const MainScreen = ({navigation}) => {
  const openPostHandler = post => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      booked: post.booked
    })
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const allPosts = useSelector(state => state.post.allPosts)

  return (
    <PostList
      data={allPosts}
      onOpen={openPostHandler}
    />
  )
}

MainScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'My Blog',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Take photo'
        iconName='ios-camera'
        onPress={() => navigation.push('Create')}
      />
    </HeaderButtons>
  ),
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Toggle Drawer'
        iconName='ios-menu'
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  }
})