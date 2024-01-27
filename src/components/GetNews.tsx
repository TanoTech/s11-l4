import { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardFooter, CardHeader, CardImg, Row, Col, Button } from 'react-bootstrap';
import { useNews } from './NewsProvider';

interface GetNewsProps {
    limit: number,
}

const GetNews: React.FC<GetNewsProps> = ({ limit }) => {
    const { articles, fetchArticles } = useNews();
    const [displayedArticles, setDisplayedArticles] = useState(limit);

    useEffect(() => {
        fetchArticles(displayedArticles);
    }, [fetchArticles, displayedArticles]);

    const loadMoreArticles = () => {
        setDisplayedArticles(displayedArticles + 10);
    };

    const truncateWord = (title: string, maxLength: number): string => {
        const words = title.split(' ');
        let truncated = '';

        for (let i = 0; i < words.length; i++) {
            if ((truncated.length + words[i].length + 1) > maxLength) break;
            truncated += (i === 0 ? '' : ' ') + words[i];
        }

        return truncated;
    };

    return (
        <Col className='d-flex flex-wrap gap-3 justify-content-center my-5'>
            {articles.map((news) => (
                    <Card className='astronaveCard' style={{ width: '15rem' }} key={news.id}>
                        <CardHeader className='astronaveCardHeader' style={{ height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '20px', padding: '1em 0', textAlign: 'center', marginTop:'2rem'}}>{news.title}</h2>
                        </CardHeader>
                        <CardImg className='astronaveCardImg img-fluid' src={news.image_url} style={{ height: '120px', objectFit: 'cover', border:'none', borderRadius: '0' }}></CardImg>
                        <CardBody className='astronaveCardBody'>
                            <p>{truncateWord(news.summary, 100)}...</p>
                        </CardBody>

                        <CardFooter className='d-flex flex-column align-items-center astronaveCardFooter'>
                            <p>{news.news_site}</p>
                            <p>{news.published_at}</p>
                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="primary">Read the full article</Button>
                            </a>
                        </CardFooter>
                    </Card>
            ))}
            <Button className='w-100' onClick={loadMoreArticles}>Load more articles</Button>
        </Col>
    );
};

export default GetNews;