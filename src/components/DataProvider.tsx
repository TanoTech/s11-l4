import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

interface Content {
    id: number;
    image_url: string;
    news_site: string;
    published_at: number;
    summary: string;
    title: string;
    updated_at: number;
    url: string;
    launches: string;
    events: string;
}

interface ApiContextData {
    articles: Content[];
    blogs: Content[]; 
    fetchData: (topic: 'articles' | 'blogs', limit?: number, title_contains?: string) => void;
}

const ApiContext = createContext<ApiContextData>({
    articles: [],
    blogs: [], 
    fetchData: () => {},
});

export const useApi = () => useContext(ApiContext);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [articles, setArticles] = useState<Content[]>([]);
    const [blogs, setBlogs] = useState<Content[]>([]);

    const fetchData = useCallback(async (topic: 'articles' | 'blogs', limit?: number, title_contains?: string) => {
        try {
            let url = `https://api.spaceflightnewsapi.net/v4/${topic}/`;

            if (limit) {
                url += `?limit=${limit}`;
            }

            if (title_contains) {
                url += limit ? `&title_contains=${title_contains}` : `?title_contains=${title_contains}`;
            }

            const response = await axios.get(url);

            if (topic === 'articles') {
                setArticles(response.data.results);
            } else if (topic === 'blogs') {
                setBlogs(response.data.results);
            }
        } catch (error) {
            console.error(`Errore durante il recupero dei ${topic}:`, error);
        }
    }, []);

    return (
        <ApiContext.Provider value={{ articles, blogs, fetchData }}>
            {children}
        </ApiContext.Provider>
    );
};