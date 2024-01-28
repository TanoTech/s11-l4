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
    launches: string,
    events: string,
}

interface Blog {
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
    articles: Article[];
    blogs: Blog[]; 
    fetchArticles: (limit?: number, title_contains?: string ) => void;
    fetchBlogs: (limit?: number, title_contains?: string ) => void; 
}

const ApiContext = createContext<ApiContextData>({
    articles: [],
    blogs: [], 
    fetchArticles: () => {},
    fetchBlogs: () => {}, 
});

export const useApi = () => useContext(ApiContext);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);

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

    const fetchBlogs = useCallback(async (limit?: number, title_contains?: string) => {
        try {
            let url = 'https://api.spaceflightnewsapi.net/v4/blogs/';

            if (limit) {
                url += `?limit=${limit}`;
            }

            if (title_contains) {
                url += `?title_contains=${title_contains}`;
            }

            const response = await axios.get(url);
            setBlogs(response.data.results);
        } catch (error) {
            console.error("Errore durante il recupero dei blog:", error);
        }
    }, []);

    return (
        <ApiContext.Provider value={{ articles, blogs, fetchArticles, fetchBlogs }}>
            {children}
        </ApiContext.Provider>
    );
};