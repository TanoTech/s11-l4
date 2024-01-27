import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

interface Article {
    id: number;
    image_url: string;
    news_site: string;
    published_at: number;
    summary: string;
    title: string;
    updated_at: number;
    url: string;
}

interface NewsContextData {
    articles: Article[];
    fetchArticles: (limit?: number, title_contains?: string ) => void;
}

const NewsContext = createContext<NewsContextData>({
    articles: [],
    fetchArticles: () => {},
});

export const useNews = () => useContext(NewsContext);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [articles, setArticles] = useState<Article[]>([]);

    const fetchArticles = useCallback(async (limit?: number, title_contains?: string) => {
        try {
            let url = 'https://api.spaceflightnewsapi.net/v4/articles/';

            if (limit) {
                url += `?limit=${limit}`;
            }

            if (title_contains) {
                url += `?title_contains=${title_contains}`;
            }

            const response = await axios.get(url);
            setArticles(response.data.results);
        } catch (error) {
            console.error("Errore durante il recupero degli articoli:", error);
        }
    }, []);

    return (
        <NewsContext.Provider value={{ articles, fetchArticles }}>
            {children}
        </NewsContext.Provider>
    );
};
