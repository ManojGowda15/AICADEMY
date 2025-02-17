import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../../constant/Colors";
import Header from "../../components/Home/Header";
import NoCourse from "../../components/Home/NoCourse";
import { db } from "./../../config/firebaseConfig";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";
import CourseList from "../../components/Home/CourseList";
import PractiseSection from "../../components/Home/PractiseSection";
import CourseProgress from "../../components/Home/CourseProgress";

const Home = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("---", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={styles.container}>
          <Header />
          {courseList?.length == 0 ? (
            <NoCourse />
          ) : (
            <View>
              <CourseList courseList={courseList} />
              <PractiseSection />
              <CourseProgress courseList={courseList} />
            </View>
          )}
        </View>
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: Platform.OS == "ios" && 45,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
