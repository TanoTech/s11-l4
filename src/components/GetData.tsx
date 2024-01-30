import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Button } from 'react-bootstrap';
import { useApi } from './DataProvider';

interface GetDataProps {
    limit: number,
    topic: 'articles' | 'blogs'
}

const GetData: React.FC<GetDataProps> = ({ limit, topic }) => {
    const { articles, blogs, fetchData } = useApi();
    const [displayedItems, setDisplayedItems] = useState(limit);
    const contents = topic === 'articles' ? articles : blogs;

    useEffect(() => {
        fetchData(topic, displayedItems);
    }, [fetchData, displayedItems, topic]);

    const loadMoreItems = () => {
        setDisplayedItems(displayedItems + 10);
    };

    const truncateWord = (text: string, maxLength: number): string => {
        const words = text.split(' ');
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
            return `${Math.floor(diffInSeconds / 60)} minuti fa`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)} ore fa`;
        } else if (diffInSeconds < 604800) {
            return `${Math.floor(diffInSeconds / 86400)} giorni fa`;
        } else {
            const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
            return publishedDate.toLocaleDateString('it-IT', options);
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
            <h2>{topic === 'articles' ? 'News' : 'Blogs'}</h2>
            {contents.map((item) => (
                <Card onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                    key={item.id}
                    style={{ backgroundImage: `url(${item.image_url})` }}>
                    <div className='d-flex'>
                        <div>
                            <CardHeader className='blurBg'>
                                <h2>{item.title}</h2>
                            </CardHeader>
                            <CardBody className='expandOnHover' style={{ display: 'none' }}>
                                <p>{truncateWord(item.summary, 300)}...</p>
                            </CardBody>
                            <CardFooter className='d-flex justify-content-center blurBg'>
                                <div className='d-flex justify-content-around'>
                                    <p>{item.news_site}</p>
                                    <p>{formatDate(item.published_at)}</p>
                                </div>
                                <div>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                        <Button>Leggi l'articolo completo</Button>
                                    </a>
                                </div>
                            </CardFooter>
                        </div>
                    </div>
                </Card>
            ))}
            <Button className='w-100' onClick={loadMoreItems}>Carica più {topic === 'articles' ? 'news' : 'blog'}</Button>
        </Col>
    );
};

export default GetData;
