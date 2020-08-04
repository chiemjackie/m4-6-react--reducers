# 4.6.2 Reducers

---

### The limitations of `useState`

No restrictions. It's the wild west.

```js
const App = () => {
  const [count, setCount] = React.useState(0);

  setCount("Hello"); // Whyyyyy makes no sense
};
```

---

### The limitations of `useState`

It spreads your application logic around

```js
const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <>
      Count: {count}
      <Game count={count} setCount={setCount} />
      <Reset setCount={setCount} />
    </>
  );
};

const Game = ({ count, setCount }) => {
  // Some logic here:
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
};

const Reset = ({ setCount }) => {
  // Some other logic here:
  return (
    <>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  );
};
```

---

### Introducing: `useReducer`

This is a _powerful_ but _complex_ tool

---

### Part I: What is a "reducer"?

A reducer is a function that takes _the current state_ and _an action_ and produces a new state.

---

### useReducer demo

```js
// All of our logic is contained here.
// There is no other way to change the state.
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      throw new Error("Unrecognized action");
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
      Count: {state}
      <Game count={count} dispatch={dispatch} />
      <Reset dispatch={dispatch} />
    </>
  );
};

const Game = ({ count, dispatch }) => {
  return (
    <>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Decrement</button>
    </>
  );
};

const Reset = ({ dispatch }) => {
  return (
    <>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </>
  );
};
```

---

# Terminology

### "Action"

an "action" is a plain Javascript object that has a "type" property.

```js
{ type: 'INCREMENT' }

{ type: 'WIN_GAME' }

{
  type: 'submit-registration',
  username: 'seriousbanker123',
  password: 'passw0rd',
  agreedToTerms: true,
}

{
  type: 'registration-failure',
  message: 'Your password is too insecure.',
}
```

---

### Action Best Practices

Actions _describe an event_. They don't dictate what should happen to the state.

```js
// Good action: describes what is happening
{ type: 'clear-form' }

// Bad action: dictates what should happen with the state
{ type: 'set-user-email', value: '' }
{ type: 'set-user-password', value: '' }
```

---

### Why?

Actions _describe what happened_ because that's how you avoid spreading your logic all over the app.

Actions describe the event. _Reducers_ control what happens because of it.

---

# Quiz

Are the following actions good to go?

If not, what could be improved?

---

```js
{ type: 'click-to-open-modal', state: { newModal: 'login' } }
// new
{ type: 'click-login-link', state: { newModal: 'login' } }
```

---

```js
{ type: 'toggle-terms-of-service', agreed: true }
// good
```

---

```js
{ type: 'set-player-coordinates', x: 41, y: 22 }
// new
{ type: 'move player', x: 41, y: 22 }

```

---

```js
{
  event: "logout";
}
// needs type
{
  type: 'click-logout',
  event: "logout";
}
```

---

# Terminology

### Reducer

A function that takes _the current state_ and _an action_, and uses that information to produce a new state.

You never call this function yourself. You pass it to `useReducer`

---

# Terminology

### Reducer

By convention, reducers often take this form:

```js
function reducer(state, action) {
  switch (action.type) {
    case "some-action": {
      // return some new state
    }
    case "some-other-action": {
      // return some other new state
    }
    default: {
      // If no action matches, this must be a mistake
      throw new Error("whoopsie");
    }
  }
}
```

The _switch_ statement is a popular convention, but it's optional. You can write reducers however you want.

---

# Terminology

### Reducer

Another example:

```js
const reducer = (state, action) => {
  if (action.type === "some-action") {
    return "hieee";
  } else if (action.type === "some-other-action") {
    return "byeee";
  } else {
    throw new Error("whoopsie");
  }
};
```

---

# Terminology

### dispatch

When you call `useReducer`, you get two things out:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

The last item in that array is the state.

The second item is `dispatch`.

---

# Terminology

### dispatch

`dispatch` takes an action as an argument, and it calls the `reducer` function. This will trigger a re-render.

---

# Exercises

Update the following examples to use `useReducer`

---

<Timer />

```jsx
// Exercise 1
const reducer = (state, action) => {
  if (action.type === "TOGGLE-LIGHT") {
    return !state;
  } else {
    throw new Error("Action type not found.");
  }
};
const LightSwitch = () => {
  const [state, dispatch] = React.useReducer(reducer, false);

  return (
    <>
      Light is {state ? "on" : "off"}.
      <button onClick={() => dispatch({ type: "TOGGLE-LIGHT" })}>Toggle</button>
    </>
  );
};
```

---

<Timer />

```jsx
// Exercise 2
const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST-DATA": return "Loading";
    case "RECEIVE-DATA": return "Done";
    case "RECEIVE-ERROR": throw new Error("Error")
    default: throw new Error("Error, unrecognized action")
  }
}
function App() {
  const [state, dispatch] = React.useReducer(reducer, "idle");

  return (
    <form
      onSubmit={() => {
        dispatch({type="REQUEST-DATA"});

        getStatusFromServer()
          .then(() => {
            dispatch({type="RECEIVE-DATA"});
          })
          .catch(() => {
            dispatch({type="RECEIVE-ERROR"});
          });
      }}
    >
      Status is: {state}
      <button>Submit</button>
    </form>
  );
}
```

---

<Timer />

```jsx
// Exercise 3
export const ModalContext = React.createContext(null);

export const ModalProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = React.useState(null);

  return (
    <ModalContext.Provider
      value={{
        currentModal,
        setCurrentModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
```

---

# Immutable updates

It's important that you don't _mutate_ the existing state:

```js
// 🚨 don't do this:
function reducer(state, action) {
  switch (action.type) {
    case "updateUserInfo": {
      state.firstName = action.firstName;
      state.lastName = action.lastName;

      return state;
    }
  }
}
```

---

# Quiz

What does the following output to the console?

```js
const obj = {
  numOfBeans: 2,
  numOfButtons: 0,
};

function grantHalfBean(someObject) {
  someObject.numOfBeans += 0.5;
  return someObject;
}

const updatedObj = grantHalfBean(obj);

console.log(obj === updatedObj);
```

---

You must produce a **new value** from the reducer, so that React knows it has to update!

---

# Demo

```jsx live=true
const initialState = {
  numOfBeans: 2,
  numOfButtons: 0,
};
const reducer = (state, action) => {
  if (action.type === "increment-beans") {
    state.numOfBeans += 0.5;
  }

  return state;
};
const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);
  return (
    <div className="App">
      <h1>
        {state.numOfBeans} Beans,
        {state.numOfButtons} Buttons.
      </h1>
      <button
        onClick={() =>
          dispatch({
            type: "increment-beans",
          })
        }
      >
        Click
      </button>
    </div>
  );
};

render(<App />);
```

---

# Fixing it

Always return a new object.

```js
const initialState = {
  numOfBeans: 2,
  numOfButtons: 0,
};
const reducer = (state, action) => {
  if (action.type === "increment-beans") {
    return {
      numOfButtons: state.numOfButtons,
      numOfBeans: state.numOfBeans + 0.5,
    };
  }

  return state;
};
```

---

### Pro-tip: Spread operator

```js
const initialState = {
  numOfBeans: 2,
  numOfButtons: 0,
  numOfBananas: 10,
  numOfBlasters: 8,
};

const reducer = (state, action) => {
  if (action.type === "increment-beans") {
    return {
      ...state, // <-- 👀
      numOfBeans: state.numOfBeans + 0.5,
    };
  }

  return state;
};
```

---

# Exercises

Update these objects to use `useReducer`, with a single immutable object

---

<Timer />

```jsx
// Exercise 4
const initialState = {
  points: 0,
  status: "idle",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET-POINT": {
      return {
        ...state,
        points: state.points + 1,
      };
    }
    case "LOSE-POINT": {
      return {
        ...state,
        points: state.points - 1,
      };
    }
    case "START-GAME": {
      return {
        points: 0,
        // or ...state if you're not resetting the points
        status: "playing",
      };
    }
    default:
      return state;
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Your score: {state.points}.
      {state.status === "playing" && (
        <>
          <button onClick={() => dispatch({ type: "GET-POINT" })}>🍓</button>
          <button onClick={() => dispatch({ type: "LOSE-POINT" })}>💀</button>
        </>
      )}
      <button onClick={() => dispatch((type: "START-GAME"))}>Start game</button>
    </>
  );
};
```

---

<Timer />

```jsx
// Exercise 5
import sendDataToServer from "./some-madeup-place";
import FormField from "./some-other-madeup-place";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE-FIRST": {
      return {
        ...state,
        firstName: action.firstName,
      };
    }
    case "CHANGE-LAST": {
      return {
        ...state,
        lastName: action.lastName,
      }
    }
    case "CHANGE-EMAIL": {
      return {
        ..state,
        email: action.email,
      }
    }
    case "RESET": {
      return {
        firstName: "",
        lastName: "",
        email: "",
      }
    }
    default: return state;
  }
}

const SignUpForm = () => {
  const [state, dispatch] = React.useDispatch(reducer, initialState);

  return (
    <form onSubmit={sendDataToServer}>
      <FormField
        label="First Name"
        value={state.firstName}
        onChange={(ev) => dispatch({type: "CHANGE-FIRST", firstName: ev.target.value})}
      />
      <FormField
        label="Last Name"
        value={state.lastName}
        onChange={(ev) => dispatch({type: "CHANGE-LAST", lastName: ev.target.value})}
      />
      <FormField
        label="Email"
        value={state.email}
        onChange={(ev) => dispatch({type: "CHANGE-EMAIL", email: ev.target.value})}
      />

      <button>Submit</button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          dispatch({type: "RESET"});
        }}
      >
        Reset
      </button>
    </form>
  );
};
```

---

### `useState` vs `useReducer`

`useReducer` is good when the logic to update state is non-trivial, or you have a complex state shape (lots of related data).

`useState` is good for small and simple bits of state.

No hard rules though. Learn both, but use whichever you want.

---

### `useReducer` and `useContext`

Because _global state_ often has _non-trivial logic_, these two hooks/patterns are frequently used together.

---

```jsx
// UserContext.js
export const UserContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login": {
      return action.user;
    }

    case "logout": {
      return null;
    }

    case "change-email": {
      return {
        ...state,
        email: action.email,
      };
    }

    default:
      throw new Error("unrecognized action: " + action.type);
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, null);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

# Exercises

Finish writing the following context components with `useReducer`

---

```js
// Exercise 6
export const StudentContext = React.createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = React.useState({
    aditya: false,
    bodhi: false,
    chetan: false,
  });

  // We need actions to:
  // - mark a student as "present"
  // - mark a student as "absent",
  // - add a student to the class.

  return (
    <StudentContext.Provider value={{ state }}>
      {children}
    </StudentContext.Provider>
  );
};
```

---

```js
// Exercise 7
export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [status, setStatus] = React.useState({
    data: null,
    status: "idle",
  });

  // We need actions to:
  // - start fetching data from the server
  // - receive data from the server
  // - receive an error from the server

  return (
    <DataContext.Provider value={{ state }}>{children}</DataContext.Provider>
  );
};
```

---

- https://reactjs.org/docs/hooks-reference.html#usereducer
