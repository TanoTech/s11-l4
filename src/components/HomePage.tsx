import GetData from "./GetData";

const HomePage: React.FC = () => {
    return (
        <main className="d-flex">
            <GetData topic={'articles'} limit={10} />
            <GetData topic={'blogs'} limit={10}   />          
        </main>
    )
}

export default HomePage;