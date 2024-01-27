import React, { useEffect } from 'react';
import { Container, Card, CardBody, CardFooter, CardHeader, CardImg, Row, Col, Button} from 'react-bootstrap';
import { useNews } from './NewsProvider';
import { title } from 'process';

interface GetNewsProps {
    limit: number,
}
const GetNews: React.FC <GetNewsProps> = ({ limit })=> {
    const { articles, fetchArticles } = useNews();

    useEffect(() => {
        fetchArticles(limit );
    }, [fetchArticles, limit ]);

    return (
        <main>
            <Container className='d-flex justify-content-center flex-wrap gap-3'>
                {articles.map((news) => (
                    <Card style={{width:'15rem'}} key={news.id}>
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