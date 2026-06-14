import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AllAppsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#9c9c9c"
            style={styles.searchIcon}
          />

          <TextInput
            placeholder="Type feature's name"
            placeholderTextColor="#b3b3b3"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.gridIcon}>
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>All Apps</Text>
        <Text style={styles.section}>WORK</Text>

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_approve_now.png")}
          title="Approve Now"
          desc="Notify managers of pending requests and allow managers to approve/reject requests from internal tools"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_star_ave.png")}
          title="Reward"
          desc="Send colleagues a thank you note or reward Gold for exceptional contribution"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_discipline.png")}
          title="Discipline"
          desc="Send a discipline warning to subordinates for violation of codes of conduct"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_learning.png")}
          title="Learning"
          desc="View a list of mandatory, registered and suggested learning courses; check-in and send feedback for each course"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_employee_info.png")}
          title="My Tasks"
        />

        <Text style={styles.section}>UTILITIES</Text>

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_fpt_care.png")}
          title="FPT Care"
          desc="FPT Care"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_event.png")}
          title="Events"
          desc="Register, check-in, check-out, send feedback to company events and programs"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_survey.png")}
          title="Survey"
          desc="Conduct and collect responses for company-wide or department-wide surveys"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_dating.png")}
          title="FPT Dating"
          desc="Dating feature"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_payslip.png")}
          title="Payslip"
          desc="Payslip"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_hpbd_employee.png")}
          title="Birthday"
          desc="Your birthday is a special moment. We're very happy to send the best wishes for you. 
Colleagues can send you birthday wishes on myFPT."
        />

        <Text style={styles.section}>NEWS</Text>

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_news.png")}
          title="News"
          desc="A collection of latest news and notable events around the company"
        />

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_star_ave.png")}
          title="Star Ave"
          desc="Recognise notable achievements within a business unit or within FPT"
        />

        <Text style={styles.section}>WIKI</Text>

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_employee_info.png")}
          title="Employee Info"
          desc="Basic, non-confidential employee information (name, gender, department, etc.)"
        />

        <Text style={styles.section}>GAME</Text>

        <AppItem
          icon={require("../../../assets/iconallapp/ic_favourite_game.png")}
          title="Game"
          desc="Community-engaging games with Gold as rewards"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

type AppItemProps = {
  icon: any;
  title: string;
  desc?: string;
};

function AppItem({ icon, title, desc }: AppItemProps) {
  return (
    <View style={styles.item}>
      <View style={styles.iconWrapper}>
        <Image source={icon} style={styles.icon} />
      </View>

      <View style={styles.content}>
        <Text style={styles.itemTitle}>{title}</Text>
        {desc ? <Text style={styles.desc}>{desc}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 12,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 18,
  },

  searchBox: {
    flex: 1,
    height: 38,
    backgroundColor: "#f1f1f1",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  searchIcon: {
    marginRight: 6,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    paddingVertical: 0,
  },

  gridIcon: {
    width: 24,
    height: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
    marginLeft: 10,
  },

  square: {
    width: 11,
    height: 11,
    borderWidth: 1,
    borderColor: "#030303",
    borderRadius: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111",
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },

  section: {
    backgroundColor: "#eee",
    color: "#555",
    fontSize: 13,
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#f2f3f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  icon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },

  content: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },

  desc: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
});
