import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import {
  GenerateCourseAIModel,
  GenerateTopicsAIModel,
} from "../../config/AiModel";
import Prompt from "../../constant/Prompt";
import { db } from "./../../config/firebaseConfig";
import { UserDetailContext } from "./../../context/UserDetailContext";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const onGenerateTopic = async () => {
    setLoading(true);
    // Get Topics from AI Model
    const PROMPT = userInput + Prompt.IDEA;
    const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
    const topicIdea = JSON.parse(aiResp.response.text());
    console.log(topicIdea);
    setTopics(topicIdea?.course_titles);
    setLoading(false);
  };

  const onTopicSelected = (topic) => {
    const isAlreadyExist = selectedTopic.find((item) => item == topic);
    if (!isAlreadyExist) {
      setSelectedTopic((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopic.filter((item) => item !== topic);
      setSelectedTopic(topics);
    }
  };

  const isTopicSelected = (topic) => {
    const selection = selectedTopic.find((item) => item == topic);
    return selection ? true : false;
  };

  /**
   * This Method is used to generate courses using AI Model
   */
  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectedTopic + Prompt.COURSE;
    ToastAndroid.show(
      "Wait few more seconds as the AI takes time to generate the Courses",
      ToastAndroid.TOP
    );

    try {
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      const courses = JSON.parse(aiResp.response.text());
      console.log(courses);

      // Save Course Info to Database
      courses?.forEach(async (course) => {
        await setDoc(doc(db, "Courses", Date.now().toString()), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email,
        });
      });
      router.push("/(tabs)/home");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Create New Course</Text>
      <Text style={styles.heading_text}>What you want to learn Today?</Text>
      <Text style={styles.desc}>
        What courses you want create (Ex., Learn Python, Java, Digital
        Marketing, etc...)
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder=" (Ex. Learn Python, UI/UX)"
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
      />

      <Button
        text={"Generate Topic"}
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />

      <View style={styles.container2}>
        <Text style={styles.selectText}>Select the course of you choice</Text>
        <View style={styles.genTextContainer}>
          {topics.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelected(item)}>
              <Text
                style={[
                  styles.genText,
                  {
                    backgroundColor: isTopicSelected(item)
                      ? Colors.PRIMARY
                      : null,
                    color: isTopicSelected(item)
                      ? Colors.WHITE
                      : Colors.PRIMARY,
                  },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {selectedTopic?.length > 0 && (
        <Button
          text={"Generate Course"}
          onPress={() => onGenerateCourse()}
          loading={loading}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  text: {
    fontFamily: "bold",
    fontSize: 28,
  },
  heading_text: {
    fontFamily: "medium",
    fontSize: 20,
  },
  desc: {
    fontFamily: "regular",
    fontSize: 17,
    marginTop: 8,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 14,
    height: 100,
    marginTop: 15,
    alignItems: "flex-start",
    fontSize: 16,
  },
  container2: {
    marginTop: 15,
    marginBottom: 15,
  },
  selectText: {
    fontFamily: "medium",
    fontSize: 18,
  },
  genTextContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
  },
  genText: {
    padding: 7,
    borderWidth: 0.4,
    borderRadius: 100,
    paddingHorizontal: 15,
  },
});
