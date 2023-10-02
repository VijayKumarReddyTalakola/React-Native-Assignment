/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      // console.log('res for posts:', res);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async postId => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
      );
      // console.log('Res  for comments:', res);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderComments = () => {
    if (selectedPost) {
      const firstComment = comments[0];
      return (
        <ScrollView>
          <Text style={styles.commentHeader}>Comments</Text>
          {/* First Comment */}
          <View style={styles.commentConatiner}>
            <Text style={styles.commentTitle}>
              Title :
              <Text style={styles.commentTitle}> {firstComment?.name}</Text>
            </Text>
            <Text style={styles.commentTitle}>
              Comment :
              <Text style={styles.commentTitle}> {firstComment?.body}</Text>
            </Text>
          </View>
          {/* Other Comments */}
          {comments?.slice(1).map(comment => (
            <View key={comment.id} style={styles.commentConatiner}>
              <Text style={styles.commentBody}>{comment.body}</Text>
            </View>
          ))}
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  return (
    <TouchableOpacity>
      <Picker
        style={styles.commentTitle}
        selectedValue={selectedPost}
        onValueChange={itemValue => {
          setSelectedPost(itemValue);
          fetchComments(itemValue);
        }}>
        <Picker.Item
          label="Select a post"
          style={styles.commentTitle}
          enabled={false}
          value={null}
        />
        {posts?.map(post => (
          <Picker.Item
            style={styles.commentBody}
            label={post.title}
            key={post.id}
            value={post.id}
          />
        ))}
      </Picker>
      {renderComments()}
    </TouchableOpacity>
  );
};

export default Home;

const styles = StyleSheet.create({
  commentHeader: {
    marginTop: 5,
    paddingHorizontal: 15,
    fontWeight: '700',
    color: 'black',
    fontSize: 24,
  },
  commentTitle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    fontWeight: '600',
    fontSize: 18,
  },
  commentBody: {
    fontSize: 15,
    fontWeight: '500',
  },
  commentConatiner: {
    marginTop: 8,
    marginBottom: 10,
    fontSize: 18,
    paddingHorizontal: 15,
  },
});
