'use client'
import { useRouter } from "next/navigation";
import { Button } from 'react-bootstrap';



const Facebook = () => {
    const router = useRouter()

    const handleBtn = () => {
        router.push("/")
    }
    
    return (
        <>
            Hello Facebook
            <Button variant="info" onClick={handleBtn}>Back home</Button>
        </>
    );
}

export default Facebook;