'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import useSWR,{Fetcher} from 'swr'
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';


const fetcher :Fetcher<IBlog , string> = (url:string) => fetch(url).then((res) => res.json());

const DetailBlogPage = ({params} : {params : {id:string}}) => {

    const router = useRouter();

    const urlApi = `http://localhost:8000/blogs/${params.id}`;
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
        <Button onClick={() => router.push('/blogs')} >Go back</Button>
                <Card className="mt-3">
          <Card.Body>
            <Card.Title>{data?.title}</Card.Title>
            <Card.Text>
            {data?.content}
            </Card.Text>
            <Card.Text>
                Author: {data?.author}
            </Card.Text>
          </Card.Body>
        </Card>
        </>

      );
};

export default DetailBlogPage;