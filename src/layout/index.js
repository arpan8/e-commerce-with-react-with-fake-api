import Navbar from "../components/navbar"


const Index = ({ children }) => {

    return (
        <>
        <div>
            <Navbar />
        </div>
        <div style={{margin: '100px'}}>
            {children}
        </div>
        </>
    )
}

export default Index