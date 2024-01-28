import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Button } from 'react-bootstrap';
import { useApi } from './NewsProvider';

interface GetNewsProps {
    limit: number,
}

const GetNews: React.FC<GetNewsProps> = ({ limit }) => {
    const { articles, fetchArticles } = useApi();
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

    const formatDate = (timestamp: number): string => {
        const now = new Date();
        const publishedDate = new Date(timestamp);
        const diffInSeconds = Math.floor((now.getTime() - publishedDate.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'Pochi secondi fa';
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        } else if (diffInSeconds < 604800) {
            return `${Math.floor(diffInSeconds / 86400)} days ago`;
        } else {
            const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
            return publishedDate.toLocaleDateString('en-EN', options);
        }
    };

    const handleCardHover = (event: React.MouseEvent<HTMLDivElement>) => {
        const cardBody = event.currentTarget.querySelector('.expandOnHover') as HTMLDivElement;

        if (cardBody) {
            cardBody.style.display = 'block';
        }
    };

    const handleCardLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        const cardBody = event.currentTarget.querySelector('.expandOnHover') as HTMLDivElement;
        
        if (cardBody) {
            cardBody.style.display = 'none';
        }
    };

    return (
        <Col className='d-flex flex-wrap gap-3 justify-content-center my-5'>
            <h2>News</h2>
            {articles.map((news) => (
                <Card onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                    key={news.id}
                    style={{ backgroundImage: `url(${news.image_url})` }}>
                    <div className='d-flex'>
                        <div>
                            <CardHeader className='blurBg'>
                                <h2 >{news.title}</h2>
                            </CardHeader>
                            <CardBody className='expandOnHover' style={{ display: 'none' }}>
                                <p>{truncateWord(news.summary, 300)}...</p>
                            </CardBody>
                            <CardFooter className='d-flex justify-content-center blurBg'>
                                <div className='d-flex justify-content-around'>
                                    <p>{news.news_site}</p>
                                    <p>{formatDate(news.published_at)}</p>
                                </div>
                                <div>
                                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                                        <Button>Read the full article</Button>
                                    </a>
                                </div>
                            </CardFooter>
                            {/* <img className='img-fluid shuttleBtn' src="/assets/imgs/shuttleCard.png" alt="" /> */}
                        </div>
                    </div>
                </Card>
            ))
            }
            <Button className='w-100' onClick={loadMoreArticles}>Load more articles</Button>
        </Col >
    );
};

export default GetNews;