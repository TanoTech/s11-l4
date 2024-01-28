import GetBlogs from "./GetBlogs";
import GetNews from "./GetNews";

const HomePage: React.FC = () => {
    return (
        <main className="d-flex">
            <GetNews limit={5} />
            <GetBlogs limit={5} />
        </main>
    )
}

export default HomePage;