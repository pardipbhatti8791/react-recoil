import logo from './logo.svg';
import './App.css';
import {atom, useRecoilState, useRecoilStateLoadable, useRecoilValue} from "recoil";
import {userData} from "./atoms/user";
import {useEffect} from "react";

const textValue = atom({
    key: "textValue",
    default: "gugu"
})

const todosAll = atom({
    key: 'todosAll',
    default: {}
})


function App() {
    const [user, setUser] = useRecoilState(userData)
    const [text, setText] = useRecoilState(textValue)
    const [todosA, setTodosA] = useRecoilStateLoadable(todosAll)



    useEffect(() => {
        const c_user = {...user}
        setUser({...c_user.user, name: 'gugu'})
        getTodos()
    }, [])

    const getTodos = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setTodosA(json))
    }

    const onChangeValue = (e) => {
        setText(e.target.value)
    }

    switch (todosA.state) {
        case 'hasValue':
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <input type="text" value={text} onChange={e => onChangeValue(e)}/>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React {JSON.stringify(user)}
                            Todos: <pre>{JSON.stringify(todosA, undefined, 2)}</pre>
                        </a>
                    </header>
                </div>
                )

        case 'loading':
            return <div>Loading...</div>;
        case 'hasError':
            throw todosA.contents;
    }
}

export default App;
