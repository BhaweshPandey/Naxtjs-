import {
  types,
  onSnapshot,
  flow,
  applySnapshot,
  getSnapshot,
} from "mobx-state-tree";
import axios from "axios";

const UserModel = types
  .model("User", {
    userId: types.number,
    id: types.number,
    title: types.string,
    body: types.string,
  })
  .actions((self) => ({
    setMath(value: number) {
      self.id = value;
    },
    setHindi(value: number) {
      self.userId = value;
    },
    // afterCreate: flow(function* afterCreate() {
    //   var res = yield axios.get("https://jsonplaceholder.typicode.com/todos/1");
    //   console.log("hello bhawesh", res.data);
    //   self.userName = res.data.title;
    // }),
  }))
  .views((self) => ({
    get totalMarks() {
      return self.id + self.userId;
    },
  }));

const TwitterStore = types
  .model("TwitterStore", {
    tweets: types.array(UserModel),
  })
  .actions((self) => ({
    afterCreate: flow(function* afterCreate() {
      var res = yield axios.get("https://jsonplaceholder.typicode.com/posts");
      console.log("hello bhawesh", res.data);
      self.tweets = res.data;
    }),
  }));

const USERS = TwitterStore.create({
  tweets: [
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      body: "bhb",
    },
  ],
});

export default USERS;
