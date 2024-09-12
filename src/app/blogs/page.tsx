'use client'
import AppTable from '@/components/app.table';
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner';

const fetcher = (url:string) => fetch(url).then((res) => res.json());



const BlogsPage = () => {

    const urlApi = "http://localhost:8000/blogs";
    const { data, error, isLoading } = useSWR(urlApi, fetcher,{
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    })
    if(!data || isLoading) {
      return (
        <div className="text-center pt-4">
          <Spinner animation="border" variant="secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </div>
      )
    }
    if(error) {
      return <div>error...</div>
    }

    
    return (
        <>
            <AppTable blogs={data?.sort((a: IBlog,b: IBlog) => b.id - a.id)}/>
        </>
    );
}

export default BlogsPage;