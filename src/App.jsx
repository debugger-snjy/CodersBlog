import './App.css'

function App() {

    // To Access the Environment Variables in the frontend, we can use them using process.env.<env_variable_name>
    // console.log(process.env.REACT_APP_APPWRITE_URL);

    // To use the vite environment variable, we will use the import.meta.env.<VITE_ENV_VARIABLE>
    console.log(import.meta.env.VITE_REACT_APP_APPWRITE_URL);

    return (
        <>
            <h1>A blog app with appwrite</h1>
        </>
    )
}

export default App
