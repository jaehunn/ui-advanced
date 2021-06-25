Redux Toolkit 사용하기(https://redux-toolkit.js.org/)

## 왜 사용하나요?

- Redux **설정**이 복잡해요!
- Redux 관련 **패키지**가 많아요!
- 단순한 작업에도 **Boilerplate** 가 너무 많아요!

## 키워드

- createAction()
- createReducer()
- createSlice()
- createAsyncThunk()

### 1. configureStore() 로 store 생성하기

- 복수의 Middleware 를 applyMiddleware() 로 묶을 필요가 없습니다.
- redux-devtools-extension 을 사용하기 위해 composeWithDevTools() 를 추가할 필요가 없습니다.

```jsx
import { configureStore } from "@reduxjs/toolkit";
import modules from "./modules";
import logger from "redux-logger";

export default function createStore() {
  const store = configureStore({
    reducer: modules,
    devTools: true,
    middleware: [logger],
  });

  return store;
}
```

### 2. createAction() 으로 action 정의하기

- 기존의 Action 객체(Action Type, Payload) 를 작성하는 BoilerPlate 를 줄입니다.

```jsx
const changeTitle = createAction("CHANGE_TITLE");

// createAction() 에 타입을 넣고 반환하면 action 함수가 반환되고, type 과 payload 를 자동으로 생성합니다.
const action = changeTitle("new title"); // { type: "CHANGE_TITLE", payload: "new title" }

// action() 의 두번째 파라미터에 콜백함수로 payload 를 커스텀하게 변경할 수 있습니다.
const action = changeTitle("new title", (content) => ({
  payload: {
    content,
    author: "jaehun",
  },
}));
```

### 3. createReducer() 로 reducer 정의하기

- 일반적인 reducer 작성법에서는 switch 문으로 Action Type 을 분리합니다. 따라서 가독성에 문제가 생길 수 있습니다.
- immer.js 를 사용하지 않아도 불변성을 자동으로 관리합니다.

```jsx
// key 값을 문자열로 넣지않고 createAction() 으로 생성한 action 함수를 넣어도 매칭이됩니다.
// 이는 toString() 를 오버라이드해서 타입을 반환하도록 했기 때문입니다.
const todoReducer = createReducer(initialState, {
  [changeTitle]: (state, action) => (state.title = action.payload),
});
```

### 4. createSlice() 으로 ducks 패턴을 정의하기

- reducer 만 생성하면 reducer 의 key 값으로 action 함수를 자동으로 생성합니다.

```jsx
const todo = createSlice({
  name: "todo", // 모듈의 이름을 정의합니다.
  initialState,
  reducers: {
    // key 값으로 action 을 자동으로 생성합니다.
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: {
    // 이곳에 정의한 리듀서는 액션을 자동으로 생성하지 않습니다.
  },
});
```

### 5. createAsyncThunk() 로 미들웨어 설정하기

- 기존의 redux 비동기 액션 처리에서 상태 pending, success, failure 를 각각 생성해야합니다. 이를 createAsyncThunk() 를 통해 지원합니다.

```jsx
// createAsyncThunk() 에서 선언한 비동기 액션 + 세 상태가 자동으로 생성됩니다.
const fetchTodo = createAsyncThunk(
  `todo/fetchTodo`, // 액션의 이름을 정의합니다.
  async (todoId, thunkAPI) => {
    const res = await todoAPI.fetchTodoInfo(todoId);

    return res.data;
  }
);
```
