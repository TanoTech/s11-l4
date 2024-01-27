import { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardFooter, CardHeader, CardImg, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

interface Article {
    id: number,
    image_url: string,
    news_site: string,
    published_at: number,
    summary: string,
    title: string,
    updated_at: number,
    url: string
}

const GetNews: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=50');
            setArticles(response.data.results);
            console.log(response.data.results);
        } catch (error) {
            console.error("Errore durante il recupero degli articoli:", error);
        }
    };

    return (
        <main>
            <Container className='d-flex justify-content-center flex-wrap gap-3'>
                    {articles.map((news, i) => (
                        <Card style={{width:'15rem'}} key={i}>
                            <CardHeader><h2>{news.title}</h2></CardHeader>
                            <CardImg className='img-fluid' src={news.image_url}></CardImg>
                            <CardBody>
                                <p>{news.summary}</p>
                            </CardBody>
                            <CardFooter className='d-flex flex-column align-items-center'>
                                <p>{news.news_site}</p>
                                <p>{news.published_at}</p>
                                <a href={news.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="primary">Read the full article</Button>
                            </a>
                            </CardFooter>
                        </Card>
                    ))}
            </Container>
        </main>
    );
};

export default GetNews;